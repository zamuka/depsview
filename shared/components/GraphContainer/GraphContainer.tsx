import * as React from 'react';
import Graph from '../Graph/Graph';

interface GraphContainerProps {
  elements: any[];
  fixedNodeConstraint: any;
  onAction: (evt: any) => void;
}

const GraphContainer: React.FunctionComponent<GraphContainerProps> = ({ elements, fixedNodeConstraint, onAction }) => {

  return (
    <Graph elements={elements} fixedNodeConstraint={fixedNodeConstraint} onAction={onAction}/>
  );
};

export default GraphContainer;
