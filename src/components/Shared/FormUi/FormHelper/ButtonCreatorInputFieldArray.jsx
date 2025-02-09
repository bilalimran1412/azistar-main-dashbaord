import React from 'react';
import { Box, Flex, FormLabel } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import { ButtonCreatorInput, ButtonFieldArrayAddButton } from '../../SidebarUi';
import { seedID } from '../../../../utils';

//TODO remove file saving as field. as file must be uploaded.
// todo implement emoji picker

const ButtonCreatorInputFieldArray = ({
  label = 'Buttons editor',
  name,
  disableDelete,
  showExternalLinkField = true,
}) => {
  const [field] = useField(name);
  const fieldValue = field.value || [];
  const handleAddButton = (arrayHelpers) => {
    arrayHelpers.push({
      id: seedID(),
      text: '',
      buttonStyle: 'text',
      icon: null,
      externalLink: '',
      isSettingExpand: false,
      sortOrder: fieldValue?.length + 1,
    });
  };

  const handleDelete = (index, arrayHelpers) => {
    arrayHelpers.remove(index);
  };

  const handleFieldItemPropChange = (index, arrayHelpers, changedProp) => {
    const fieldItemToUpdate = {
      ...arrayHelpers.form.values[arrayHelpers.name][index],
      file: '',
      icon: '',
      image: '',
      emoji: '',
      ...(changedProp && { ...changedProp }),
    };

    arrayHelpers.replace(index, fieldItemToUpdate);
  };

  return (
    <Box width='100%'>
      <FormLabel variant='h2'>{label}</FormLabel>

      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <Flex
            bgColor={'#42456A'}
            padding='10px'
            rounded={'3px'}
            width='100%'
            direction='column'
            gap={3}
            overflow='hidden'
            whiteSpace='nowrap'
          >
            {fieldValue?.map((fieldItem, index) => (
              <ButtonCreatorInput
                key={fieldItem.id}
                id={fieldItem.id}
                showExternalLinkField={showExternalLinkField}
                name={`${name}[${index}]`}
                handleDeleteClick={() => handleDelete(index, arrayHelpers)}
                fieldItem={fieldItem}
                hideDelete={!disableDelete}
                handleFieldItemPropChange={(changedProp) => {
                  handleFieldItemPropChange(index, arrayHelpers, changedProp);
                }}
              />
            ))}
            <ButtonFieldArrayAddButton
              handleAddButton={() => {
                handleAddButton(arrayHelpers);
              }}
            />
          </Flex>
        )}
      />
    </Box>
  );
};

export default ButtonCreatorInputFieldArray;
