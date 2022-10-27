import GraphContainer from './GraphContainer/GraphContainer';
import { packetsService } from '../services/packets/packets';
import { Box } from '@mui/material';
import ConfigDrawer from './ConfigDrawer/ConfigDrawer';
import styles from '../../styles/Home.module.css'
import { useContext, useEffect, useRef } from 'react';
import { ConfigContext } from '../store/ConfigContextProvider';
import { storage } from '../services/storage/storage';

export const MainPageContent = () => {
  const layout = useRef(null);
  const graph = useRef(null);

  const {
    elements,
    setSelected,
    doubleClickAction,
    nodes,
    setSource,
    setDestination,
    setElements,
    setNodes,
    constraints,
  } = useContext(ConfigContext);

  useEffect(() => {
    const initialSourceNode = storage.getItem('config.sourceNode') || '';
    const initialDestNode = storage.getItem('config.destNode') || '';
    setSource(initialSourceNode);
    setDestination(initialDestNode);

    packetsService.buildConsumerTree(initialSourceNode, initialDestNode);
    console.log(initialSourceNode);
    console.log(initialDestNode);
    console.log(initialDestNode);

    setElements(packetsService.elements, packetsService.fixedNodeConstraint);
    setNodes(packetsService.nodes);
  }, []);


  const handleAction = (evt: any) => {
    switch (evt.type) {
      case 'select': {
        setSelected(evt.details.nodeId);
        break;
      }
      case 'layoutReady': {
        layout.current = evt.details.layout;
        break;
      }
      case 'graphReady': {
        graph.current = evt.details.graph;
        break;
      }
      case 'dblclick': {
        if (doubleClickAction === 'MR') {
          const [category, project] = evt.details.nodeId.split('/');
          window.open(`https://code.devops.fds.com/polaris/${category.replace('@', '')}/${project}/-/merge_requests`);
        }
        break;
      }
      default:
        console.log(evt);
    }
  }

  return (
    <div className={styles.container}>
      <Box display="flex">
        <ConfigDrawer/>
      </Box>
      <main className={styles.main}>
        <GraphContainer
          elements={elements || []}
          fixedNodeConstraint={constraints}
          onAction={handleAction}
        />
      </main>
    </div>
  );
}
