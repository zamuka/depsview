import * as React from 'react';
import cytoscape from 'cytoscape';
// @ts-ignore
import * as fcose from 'cytoscape-fcose';

cytoscape.use(fcose);

import { style } from './style';

const options = {
  name: "fcose",
  quality: "default",
  randomize: true,
  animate: true,
  animationDuration: 0,
  fit: true,
  padding: 50,
  nestingFactor: 0.1,
  gravityRangeCompound: 10,
  gravityCompound: 1001,
  fixedNodeConstraint: [],
  nodeRepulsion: 4500,
  idealEdgeLength: 200,
  gravity: 0.25,
  gravityRange: 3.8,
  edgeElasticity: 0.45,
  numIter: 2500,
  tile: true,
  tilingPaddingVertical: 10,
  tilingPaddingHorizontal: 10,
  step:"all"
}

const Graph: React.FunctionComponent<{
  elements: cytoscape.ElementDefinition[];
  fixedNodeConstraint: any;
  onAction: (evt: any) => void;
}> = ({ elements, fixedNodeConstraint, onAction }) => {
  const container = React.useRef<HTMLDivElement>(null);
  const graph = React.useRef<cytoscape.Core>();
  const layout = React.useRef<cytoscape.Layouts>();
  const lastSelectedNode = React.useRef<any>()

  React.useEffect(() => {
    if (graph.current) {
      if (layout.current) {
        layout.current.stop();
      }
      graph.current.remove('');
      graph.current.add(elements);
      layout.current = graph.current.elements().makeLayout({
        ...options,
        fixedNodeConstraint,
      } as any);
      layout.current.run();
      onAction({
        type: 'layoutReady',
        details: {
          layout: layout.current,
        },
      });
    }
  }, [elements]);

  React.useEffect(() => {
    if (!container.current) {
      return;
    }
    try {
      if (!graph.current) {
        graph.current = cytoscape({
          elements,
          style,
          maxZoom: 1,
          wheelSensitivity: 0.2,
          container: container.current
        });

        onAction({
          type: 'graphReady',
          details: {
            graph: graph.current,
          }
        })


        graph.current.on('select', () => {
          const node = graph?.current?.$(':selected').first();

          if (node?.isNode()) {
            lastSelectedNode.current = node.data();
            onAction({
              type: 'select',
              details: {
                nodeId: node?.data().id,
                position: (node as any)?.position(),
                data: node?.data(),
              }
            });
            return;
          }

          const { target, source } = node?.data();
          graph?.current?.$(':selected').deselect();

          const nodeToSelect = lastSelectedNode.current?.id === target ? source : target;

          graph?.current?.$(`node[id="${nodeToSelect}"]`).select();
        });

        graph.current.on('dblclick', () => {
          const node = graph?.current?.$(':selected').first();
          if (node?.isNode()) {
            onAction({
              type: 'dblclick',
              details: {
                nodeId: node?.data().id,
                data: node?.data(),
              }
            });
          }
        });

      }
    } catch (error) {
      console.error(error);
    }
    return () => {
      // graph.current && graph.current.destroy();
    };
  }, []);

  return <div className="graph" ref={container} />;
};

export default Graph;
