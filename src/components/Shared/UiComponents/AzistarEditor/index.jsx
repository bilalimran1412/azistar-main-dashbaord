import React from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import './DraftEditor.css';
import DraftEditor from './MainEditor';
import { decorators } from './MainEditor/Helpers/Decorator';
import { Box } from '@chakra-ui/react';

const AzistarEditor = ({
  type = 'inline',
  placeholder,
  setFieldValue,
  initialValue,
}) => {
  const [editorState, setEditorState] = React.useState(() => {
    if (initialValue) {
      return EditorState.createWithContent(
        convertFromRaw(initialValue),
        decorators
      );
    } else {
      return EditorState.createEmpty(decorators);
    }
  });

  const debouncedOnChange = React.useCallback(() => {
    try {
      const contentState = editorState.getCurrentContent();
      const plainText = contentState.getPlainText();
      const raw = convertToRaw(contentState);
      setFieldValue && setFieldValue(raw, plainText);
    } catch (error) {}
  }, [editorState, setFieldValue]);

  const onEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  const onEditorBlur = () => {
    debouncedOnChange();
  };

  return (
    <Box width='100%'>
      <DraftEditor
        setEditorState={setEditorState}
        onEditorChange={onEditorChange}
        editorState={editorState}
        type={type}
        placeholder={placeholder}
        onEditorBlur={onEditorBlur}
      />
    </Box>
  );
};

export default AzistarEditor;
