import React from 'react';
import { Editor, RichUtils } from 'draft-js';
import { myBlockStyleFn, styleMap } from './Helpers/blockStyles';
import Toolbar from './Helpers/Toolbar';
import { Box, Flex } from '@chakra-ui/react';

const DraftEditor = ({
  onEditorChange,
  editorState,
  setEditorState,
  type,
  placeholder,
  onEditorBlur,
}) => {
  const editorRef = React.useRef();

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  };
  const handleFocus = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleToolbarAction = (updatedEditorState) => {
    setEditorState(updatedEditorState);
    setTimeout(() => {
      handleFocus();
    }, 0);
  };

  return (
    <Flex width='100%' direction='column' gap={1.5}>
      <Box
        height={type === 'inline' ? '45px' : '120px'}
        fontSize='14px'
        className='draft-editor-container'
        sx={{
          '.public-DraftEditorPlaceholder-root': {
            color: '#9197a3',
            position: 'absolute',
            width: '80%',
            // zIndex: 1,
          },
          '.DraftEditor-root': {
            height: '100%',
            backgroundColor: '#fff',
            borderRadius: '2px',
            border: '1px solid rgba(16, 22, 26, .2)',
            cursor: 'text',
            padding: '11px 13px',
            overflow: 'auto',
            fontSize: '13px',
            position: 'relative',
          },
          '.DraftEditor-editorContainer': {
            pos: 'relative',
            // zIndex: 1,
          },
          '.DraftEditor-editorContainer ul, .DraftEditor-editorContainer ol': {
            listStyleType: 'revert-layer',
            padding: '0',
            marginLeft: '15px',
          },
        }}
        onFocus={handleFocus}
      >
        <Editor
          ref={editorRef}
          placeholder={placeholder}
          handleKeyCommand={handleKeyCommand}
          editorState={editorState}
          customStyleMap={styleMap}
          blockStyleFn={myBlockStyleFn}
          onChange={onEditorChange}
          onBlur={onEditorBlur}
        />
      </Box>
      <Toolbar
        editorState={editorState}
        setEditorState={handleToolbarAction}
        type={type}
      />
    </Flex>
  );
};

export default DraftEditor;
