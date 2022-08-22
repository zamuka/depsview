import { Action } from '../types/Action';
import { ConfigState } from '../types/ConfigState';

export const initialConfigState: ConfigState = {
  sourceNode: '',
  destNode: '',
  selectedNode: '',
  elements: [],
  nodes: [],
  constraints: [],
  doubleClickAction: 'MR',
  selectedNodeVersion: '',
}

export const configActions = {
  SET_SRC_NODE: 'SET_SRC_NODE',
  SET_DEST_NODE: 'SET_DEST_NODE',
  SET_SELECTED_NODE: 'SET_SELECTED_NODE',
  SET_NODES: 'SET_NODES',
  SET_ELEMENTS: 'SET_ELEMENTS',
  UPDATE_GRAPH: 'UPDATE_GRAPH',
  SET_DOUBLE_CLICK_ACTION: 'SET_DOUBLE_CLICK_ACTION',
  SET_NODE_VERSION: 'SET_NODE_VERSION',
}

export const configReducer = (state: ConfigState = initialConfigState, action: Action): ConfigState => {
  switch (action.type) {
    case configActions.SET_SRC_NODE: {
      return {
        ...state,
        sourceNode: action.payload.nodeId,
      }
    }
    case configActions.SET_DEST_NODE: {
      return {
        ...state,
        destNode: action.payload.nodeId,
      }
    }
    case configActions.SET_SELECTED_NODE: {
      return {
        ...state,
        selectedNode: action.payload.nodeId,
        selectedNodeVersion: action.payload.version,
      }
    }
    case configActions.SET_DOUBLE_CLICK_ACTION: {
      return {
        ...state,
        doubleClickAction: action.payload.doubleClickAction,
      }
    }

    case configActions.SET_NODES: {
      return {
        ...state,
        nodes: action.payload.nodes,
      }
    }

    case configActions.SET_ELEMENTS: {
      return {
        ...state,
        elements: action.payload.elements,
        constraints: action.payload.constraints,
      }
    }

    case configActions.SET_NODE_VERSION: {
      return {
        ...state,
        selectedNodeVersion: action.payload.version,
      }
    }

    default:
  }
  return state;
}