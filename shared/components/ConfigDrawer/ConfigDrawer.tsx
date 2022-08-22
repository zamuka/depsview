import FileReaderInput from '../FileReaderInput/FileReaderInput';
import { Autocomplete, Divider, Stack, TextField, Box, Button, MenuItem, Select, InputLabel, FormControl, InputAdornment, IconButton, Tooltip } from '@mui/material';
import HubIcon from '@mui/icons-material/Hub';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useContext } from 'react';
import { ConfigContext } from '../../store/ConfigContextProvider';
import { packetsService } from '../../services/packets/packets';
import { nodeManager } from '../../services/packets/nodeManager';
import { isEmpty } from 'lodash';

const ConfigDrawer = () => {
  const {
    selectedNode,
    sourceNode,
    destNode,
    setSource,
    setElements,
    setDestination,
    doubleClickAction,
    setDblClickAction,
    nodes,
    elements,
    setNodeVersion,
    selectedNodeVersion,
  } = useContext(ConfigContext);

  const options = nodes.map(node => node.data.label);

  const handleSourceChange = (nodeId: string) => {
    setSource(nodeId);
  }

  const handleDestChange = (nodeId: string) => {
    setDestination(nodeId);
  }

  const buttonClick = () => {
    packetsService.buildConsumerTree(sourceNode, destNode);
    setElements(packetsService.elements, packetsService.fixedNodeConstraint);
  }

  const resetClick = () => {
    packetsService.buildConsumerTree();
    setElements(packetsService.elements, packetsService.fixedNodeConstraint);
  }


  const copyToClipboard = (value: string = '') => {
    navigator.clipboard.writeText(value);
    console.log(value);
  }

  return (
  <Box padding={2} minWidth={400} display="flex" flexDirection="column" justifyContent="space-between">
    <Stack spacing={2} >
      <Autocomplete
        disablePortal
        id="selected-node"
        options={options}
        value={selectedNode}
        size="small"
        renderInput={(params) => <TextField
          {...params}
          label="Selected node"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="Copy">
                  <IconButton edge="end" size="small" onClick={() => copyToClipboard(selectedNode || '')}>
                    <CopyAllIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          />
        }
      />

      <TextField
        label="Version"
        value={selectedNodeVersion}
        onChange={(evt) => setNodeVersion(evt.target.value)}
        disabled={!selectedNode}
        size="small"
      />

      <Divider/>

      <Autocomplete
        disablePortal
        id="source-node"
        options={options}
        value={sourceNode}
        size="small"
        onChange={(evt, value) => handleSourceChange(value || '')}
        renderInput={(params) => <TextField
          {...params}
          label="Source"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="Use selected">
                  <IconButton edge="end" size="small" onClick={() => handleSourceChange(selectedNode || '')}>
                    <PlayForWorkIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />}
      />

      <Autocomplete
        disablePortal
        id="dest-node"
        options={options}
        value={destNode}
        size="small"
        onChange={(evt, value) => handleDestChange(value || '')}
        renderInput={(params) => <TextField
          {...params}
          label="Destination"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Tooltip title="Use selected">
                  <IconButton edge="end" size="small" onClick={() => handleDestChange(selectedNode || '')}>
                    <PlayForWorkIcon />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />}
      />

      <Button variant="contained" onClick={buttonClick}>Show dependency tree</Button>
      <Button variant="outlined" onClick={resetClick}>Reset</Button>

    </Stack>


    <Stack spacing={2}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Double Click Action</InputLabel>
        <Select
          label="Double Click Action"
          value={doubleClickAction}
          onChange={(event: any) => setDblClickAction(event.target.value)}
          size="small"
        >
          <MenuItem value={'MR'}>Open MR</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <FileReaderInput
          {...(isEmpty(elements) ? {
            color: 'error',
            tooltip: 'Missing dependencies data',
            variant: 'outlined'
          } : {
            tooltip: 'Set dependencies',
          })
          }

        title={<HubIcon />}
        onLoad={x => nodeManager.setRawNodes(x)}/>

        <FileReaderInput
          tooltip="Set constraints"
          title={<AppRegistrationIcon />}
          onLoad={x => nodeManager.setConstraints(x)}/>
      </Box>
    </Stack>


  </Box>
  );
}

export default ConfigDrawer;