import React from 'react';

import type { ChangeEvent } from 'react';
import { Button, Tooltip } from '@mui/material';

type FileReaderInputProps = {
  onLoad: (data: any) => void;
  title?: string | any;
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  variant?: "text" | "contained" | "outlined";
  tooltip?: string;
}

export default function FileReaderInput(props: FileReaderInputProps) {

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();

    reader.onload = function(event) {
      reader = null as any;
      if (!event.target) {
        return;
      }
      const result = event.target.result;
      const json = JSON.parse(result as string || '');
      props.onLoad(json)
    }

    const files = e.target.files;
    if (files && files[0]) {
      reader.readAsText(files[0]);
    }
  }

  const btn = (<Button
      variant={props.variant ?? 'contained'}
      color={props.color}
      component="label"
      style={{ marginRight: '8px' }}
    >
      {props.title}
      <input
        type="file"
        accept=".json"
        value=""
        hidden
        onChange={handleFileSelect}
      />
    </Button>
  );

  if (props.tooltip) {
    return (
      <Tooltip title={props.tooltip}>
        {btn}
      </Tooltip>)
  }

  return btn;
}