import { v4 as uuidv4 } from 'uuid';

import { DepNode } from "../../types/DepNode";

export function getEdges(nodes: DepNode[]) {
  const nodeNames = new Set(nodes.map(node => node.data.id));

  const result = [];
  for (let node of nodes) {
    for (let target of node.dependencies) {
      if (nodeNames.has(target)) {
        const edge = {
          data: {
            target,
            id: "edge1 " + uuidv4(),
            source: node.data.label,
          }
        };

        result.push(edge);
      }
    }
  }
  return result;
}