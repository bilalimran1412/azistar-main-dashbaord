import React from 'react';
import { useField, useFormikContext } from 'formik';
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import { parseJSON } from '../../../utils/parser';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ header: '1' }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['blockquote', 'code-block'],
  ],
};
function isQuillEmpty(quill) {
  if (JSON.stringify(quill.getContents()) === '{"ops":[{"insert":"\\n"}]}') {
    return true;
  } else {
    return false;
  }
}

function QuillEditorField({ name, label, placeholder, labelVariant = '' }) {
  const [field, meta, helpers] = useField(name);
  const { errors, touched, setFieldValue } = useFormikContext();
  const defaultValue = parseJSON(field.value);

  return (
    <FormControl isInvalid={touched[name] && errors[name]}>
      <FormLabel variant={labelVariant}>{label}</FormLabel>
      <ReactQuill
        theme='snow'
        placeholder={placeholder}
        defaultValue={defaultValue?.messageRaw}
        modules={modules}
        onChange={(content, delta, source, editor) => {
          const isEmpty = isQuillEmpty(editor);
          if (isEmpty) {
            return;
          }
          const messageRaw = editor.getContents().ops;
          const messageRichText = content;
          const messageText = editor.getText();
          const stringContent = JSON.stringify({
            messageRaw,
            messageText,
            messageRichText,
          });
          setFieldValue('textareaFieldData', messageRichText);
          helpers.setValue(stringContent);
        }}
      />
      <FormErrorMessage>{errors[name]}</FormErrorMessage>
    </FormControl>
  );
}

export default QuillEditorField;
