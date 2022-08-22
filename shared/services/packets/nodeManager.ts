import { storage } from './../storage/storage';
import { RawNode } from '../../types/RawNode';

const NODES_STORAGE_KEY = 'storage.nodes';
const CONSTRAINTS_STORAGE_KEY = 'storage.constraints';


function safeParse(str: string | null, defaultValue: any = null) {
  if (!str) {
    return defaultValue;
  }
  try {
    return JSON.parse(str);
  } catch(e) {
    return defaultValue;
  }
}
class NodeManager {
  rawNodes: RawNode[] = [];
  constraints: any[] = [];

  constructor() {
    this.restore();
  }

  restore() {
    this.rawNodes = safeParse(storage.getItem(NODES_STORAGE_KEY), []);
    this.constraints = safeParse(storage.getItem(CONSTRAINTS_STORAGE_KEY), []);
  }

  setRawNodes(rawNodes: RawNode[]) {
    this.rawNodes = rawNodes;
    storage.setItem(NODES_STORAGE_KEY, JSON.stringify(rawNodes));
    location.reload();
  }

  setConstraints(constraints: any[]) {
    this.constraints = constraints;
    storage.setItem(CONSTRAINTS_STORAGE_KEY, JSON.stringify(constraints));
    location.reload();
  }
}

export const nodeManager = new NodeManager();