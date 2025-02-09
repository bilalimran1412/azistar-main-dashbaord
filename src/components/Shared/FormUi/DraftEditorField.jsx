import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import React from 'react';
import AzistarEditor from '../UiComponents/AzistarEditor';
import { ContentState, convertToRaw } from 'draft-js';

function DraftEditorField({
  name,
  label,
  placeholder,
  labelVariant = '',
  type = 'full',
  containerStyles = {},
  setNodeContent = false,
  setRawBlocks = false,
  setOnlyText = false,
}) {
  const [field] = useField(name);
  const { errors, touched, setFieldValue } = useFormikContext();

  const handleChange = (rawBlocks, plainText) => {
    if (setOnlyText) {
      setFieldValue(`${name}`, plainText);
      return;
    }
    if (setNodeContent) {
      //maybe use text
      setFieldValue(`nodeTextContent`, plainText);
    }
    setFieldValue(`${name}.rawBlocks`, rawBlocks);

    setFieldValue(`${name}.text`, plainText);
  };

  const initialValue = React.useMemo(() => {
    const blocks = field.value?.rawBlocks;
    const initialText = field.value?.text;
    const onlyText = field.value && typeof field.value === 'string';
    if (blocks) return blocks;
    if (onlyText) {
      const contentState = ContentState.createFromText(field.value);
      return convertToRaw(contentState);
    }
    if (initialText) {
      const contentState = ContentState.createFromText(initialText);
      return convertToRaw(contentState);
    }
    return null;
  }, [field.value]);

  return (
    <FormControl
      isInvalid={touched[name] && errors[name]}
      sx={{
        ...containerStyles,
      }}
    >
      {label && <FormLabel variant={labelVariant}>{label}</FormLabel>}
      <AzistarEditor
        type={type}
        placeholder={placeholder}
        setFieldValue={handleChange}
        initialValue={initialValue}
      />
      <FormErrorMessage>{errors[name]}</FormErrorMessage>
    </FormControl>
  );
}

export { DraftEditorField };
