import React, { useState } from 'react';
import { useField } from 'formik';
import { TagInputField } from '../SidebarUi';
import { FormLabel, Grid } from '@chakra-ui/react';

const FormTagInput = ({ name, containerStyle, label, labelVariant }) => {
  const [field, , helpers] = useField(name);
  const { setValue } = helpers;
  const [tags, setTags] = useState(field.value || []);
  const [inputValue, setInputValue] = useState('');

  const handleTagAdd = (newTag) => {
    const updatedTags = [...tags, ...newTag];
    setTags(updatedTags);
    setValue(updatedTags);
    setInputValue('');
  };

  const handleTagRemove = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
    setValue(updatedTags);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Grid flexDirection='column' style={containerStyle} width='100%'>
        <FormLabel
          htmlFor={name}
          //   margin={0}
          marginBottom='8px'
          width='auto'
          cursor='pointer'
          variant={labelVariant}
        >
          {label}
        </FormLabel>
        <TagInputField
          tags={tags}
          onTagAdd={handleTagAdd}
          onTagRemove={handleTagRemove}
          inputValue={inputValue}
          onInputChange={handleInputChange}
        />
      </Grid>
    </>
  );
};

export default FormTagInput;
