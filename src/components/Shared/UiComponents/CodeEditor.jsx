import React from 'react';
import { javascript } from '@codemirror/lang-javascript';
import ReactCodeMirror from '@uiw/react-codemirror';

const CodeEditor = ({
  height = '300px',
  theme = 'dark',
  editable = false,
  ...props
}) => {
  return (
    <ReactCodeMirror
      height={height}
      theme={theme}
      editable={editable}
      extensions={[javascript({ jsx: true })]}
      {...props}
    />
  );
};

export { CodeEditor };
