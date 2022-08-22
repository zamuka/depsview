import { DepNode } from './DepNode';

export type ConfigState = {
  sourceNode?: string;
  destNode?: string;
  selectedNode?: string;

  elements: DepNode[];
  nodes: DepNode[];
  doubleClickAction: string;
  constraints: any[];
  selectedNodeVersion?: string;
}