import { createContext, FC, PropsWithChildren, useCallback, useReducer } from "react";
import { storage } from "../services/storage/storage";
import { Action } from "../types/Action";
import { ConfigState } from "../types/ConfigState";
import { DepNode } from "../types/DepNode";
import { configActions, configReducer, initialConfigState } from "./configReducer";

type ConfigContextType = ConfigState & {
  setSource(nodeId: string): void;
  setDestination(nodeId: string): void;
  setSelected(nodeId: string): void;
  setDblClickAction(actionName: string): void;
  setNodes(nodes: DepNode[]): void;
  setElements(elements: DepNode[], constraints: any[]): void;
  setNodeVersion(version: string): void;
}

export const ConfigContext = createContext<ConfigContextType>(null as any);

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, originalDispatch] = useReducer(configReducer, initialConfigState);

  const dispatch = useCallback((action: Action) => {
    console.log(action);
    originalDispatch(action);
  }, [originalDispatch]);


  const value: ConfigContextType = {
    ...state,
    setSource(nodeId: string) {
      storage.setItem('config.sourceNode', nodeId);
      dispatch({
        type: configActions.SET_SRC_NODE,
        payload: { nodeId }
      })
    },
    setDestination(nodeId: string) {
      storage.setItem('config.destNode', nodeId);
      dispatch({
        type: configActions.SET_DEST_NODE,
        payload: { nodeId }
      })
    },
    setSelected(nodeId: string) {
      dispatch({
        type: configActions.SET_SELECTED_NODE,
        payload: {
          nodeId,
          version: storage.getItem(`versions.${nodeId}`) || '',
        }
      })
    },
    setDblClickAction(actionName: string) {
      dispatch({
        type: configActions.SET_DOUBLE_CLICK_ACTION,
        payload: { actionName },
      })
    },

    setNodes(nodes: DepNode[]) {
      dispatch({
        type: configActions.SET_NODES,
        payload: { nodes },
      })
    },

    setElements(elements: DepNode[], constraints = []) {
      dispatch({
        type: configActions.SET_ELEMENTS,
        payload: { elements, constraints },
      })
    },

    setNodeVersion(version: string = '') {
      storage.setItem(`versions.${state.selectedNode}`, version || '');
      dispatch({
        type: configActions.SET_NODE_VERSION,
        payload: { version },
      })
    }


  }

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
}
