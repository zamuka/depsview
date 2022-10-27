import { isEmpty } from 'lodash';

import { DepNode } from '../../types/DepNode';
import { getEdges } from './edges';
import { nodeManager } from './nodeManager';

interface NodeConstraint {
  nodeId: string;
  position: {
    x: number;
    y: number;
  }
}

const includeDev = true;

const data = nodeManager.rawNodes;
const fixedNodeConstraint = nodeManager.constraints;

const allNodes: DepNode[] = data.map(item => {
  const dependencies: string[] = [
    ...item.dependencies,
    ...(includeDev ? item.devDependencies : []),
  ];
  const dependents = [].concat((includeDev && item.devDependents) as any, item.dependents as any);

  return {
    data: {
      id: item.name,
      label: item.name,
    },
    dependencies,
    dependents,
  }
});

const nodeMap: { [key: string]: DepNode } = {};

allNodes.forEach(node => nodeMap[node.data.id] = node);

const nodes: DepNode[] = allNodes;

const edges: any[] = getEdges(nodes);

const allItems = new Set(nodes.map(node => node.data.label));

function addRadialPlacement() {

  // center
  const core = [
    '@component/common', '@component/experiment', '@core/server', '@core/style-guide',
    '@core/dev-server', '@core/lib', '@core/vendor', '@core/middleware', '@core/style-guide-bcom'
  ];

  const cx = 0;
  const cy = 2000;

  let r = 100;
  for (let i = 0; i < core.length; i = i + 1) {
    const angle = 2 * Math.PI * i / core.length;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    fixedNodeConstraint.push(
      {
        nodeId: core[i],
        position: { x, y }
      }
    );
  }

  const leftovers = Array.from(allItems).filter(item => !fixedNodeConstraint.some(node => node.nodeId === item));

  const leftComponents = leftovers.filter(item => item.startsWith('@component'));
  const leftFeatures = leftovers.filter(item => item.startsWith('@feature'));
  const leftPages = leftovers.filter(item => item.startsWith('@page'));

  r = 1000;
  for (let i = 0; i < leftComponents.length; i = i + 1) {
    const angle = 2 * Math.PI * i / leftComponents.length;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    fixedNodeConstraint.push(
      {
        nodeId: leftComponents[i],
        position: { x, y }
      }
    );
  }

  r = 2000;
  for (let i = 0; i < leftFeatures.length; i = i + 1) {
    const angle = 2 * Math.PI * i / leftFeatures.length;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    fixedNodeConstraint.push(
      {
        nodeId: leftFeatures[i],
        position: { x, y }
      }
    );
  }

  r = 2800;
  for (let i = 0; i < leftPages.length; i = i + 1) {
    const angle = 2 * Math.PI * i / leftPages.length;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    fixedNodeConstraint.push(
      {
        nodeId: leftPages[i],
        position: { x, y }
      }
    );
  }
}

addRadialPlacement();

class PacketsService {
  includeDevDeps = true;
  fixedNodeConstraint = fixedNodeConstraint;
  nodes = nodes;
  edges = edges;
  elements = [...nodes, ...edges];

  reset() {
    this.fixedNodeConstraint = fixedNodeConstraint;
    this.elements = [...this.nodes, ...this.edges];
  }

  buildConsumerTree(sourceNodeId: string = '', destNodeId: string = '') {
    const sourceNode = nodeMap[sourceNodeId];
    const destNode = nodeMap[destNodeId];

    if (!sourceNode && !destNode) {
      this.reset();
      return;
    }

    function getTreeNodes(node: DepNode, treeProperty: 'dependents' | 'dependencies') {
      const uniqIds = new Set([node.data.id]);
      const treeNodes = [node];

      for (let index = 0; index < treeNodes.length; index = index + 1) {
        const node = treeNodes[index];
        for (let childId of node?.[treeProperty] ?? []) {
          if (!uniqIds.has(childId)) {
            if (childId in nodeMap) {
              treeNodes.push(nodeMap[childId]);
            }
            uniqIds.add(childId);
          }
        }
      }
      return treeNodes;
    }

    let nodes: DepNode[] | null = null;

    if (!destNode) {
      nodes = getTreeNodes(sourceNode, 'dependents');
    }

    if (!sourceNode) {
      nodes = getTreeNodes(destNode, 'dependencies');
    }

    if (!nodes) {
      const sourceTreeNodes = getTreeNodes(sourceNode, 'dependents');
      const destTreeNodes = getTreeNodes(destNode, 'dependencies');

      const destTreeNodeIds = new Set(destTreeNodes.map(node => node.data.id));
      nodes = sourceTreeNodes.filter(node => destTreeNodeIds.has(node.data.id));
    }

    const edges = getEdges(nodes);

    this.elements = [...nodes, ...edges];
    this.fixedNodeConstraint = this.createLevelConstraints(nodes, sourceNodeId, destNodeId);

  }

  createLevelConstraints(nodes: DepNode[], sourceNode: string, destNode: string) {

    const nodeMap: { [key: string]: DepNode } = {};
    nodes.forEach(node => nodeMap[node.data.id] = node);
    const result: NodeConstraint[] = [];
    const levelHeight = 300;
    const nodeSpacing = 200;
    let y = 0;

    const direction = sourceNode in nodeMap ? 1 : -1;

    const startNodeId = direction === 1 ? sourceNode : destNode;

    let currentLevelNodes: DepNode[] = [nodeMap[startNodeId]];

    const freeNodeIds = new Set(nodes.map(node => node.data.id));
    const usedNodeIds = new Set([startNodeId]);

    freeNodeIds.delete(startNodeId);

    const addNodes = () => {
      currentLevelNodes.forEach((node, index) => {
        const levelWidth = (currentLevelNodes.length - 1) * nodeSpacing;
        const x = index * nodeSpacing - levelWidth / 2;
        result.push({
          nodeId: node.data.id,
          position: { x, y },
        });
      });
    }

    const nodeFilterFn = direction === 1 ?
      (node: DepNode) => node.dependencies.every(depName => !freeNodeIds.has(depName))
      :
      (node: DepNode) => {
        return node.dependents.every(depName => {
          return usedNodeIds.has(depName) || !(depName in nodeMap);
        }); // && node.dependents.some(depName => usedNodeIds.has(depName));
        // node.dependents.every(depName => usedNodeIds.has(depName));
      }

    do {
      addNodes();
      currentLevelNodes = Array.from(freeNodeIds)
        .map(nodeId => nodeMap[nodeId])
        .filter(nodeFilterFn);

       y = y + levelHeight * direction;

      currentLevelNodes.forEach(node => {
        freeNodeIds.delete(node.data.id);
        usedNodeIds.add(node.data.id);
      });

    } while (currentLevelNodes.length);

    return result;
  }

  isEmpty() {
    return isEmpty(data);
  }

}

export const packetsService = new PacketsService();