import { Box, Divider, Flex } from '@chakra-ui/react';
import {
  DraftEditorField,
  FormDropdown,
  FormTextField,
  FormToggleSwitch,
} from '../../../FormUi';
import FormVariableSelectorDropdown from '../../../FormUi/FormVariableSelectorDropdown';
import React from 'react';
const options = [
  { label: 'Placeholder', value: 'placeholder' },
  { label: 'Default Value', value: 'default' },
];
function CommonFields({ subFieldName, children }) {
  return (
    <>
      <FormTextField
        name={`${subFieldName}.label`}
        label='Label'
        variant='custom'
        labelVariant='h3'
        placeholder='Label Text'
      />
      <FormToggleSwitch
        name={`${subFieldName}.isRequired`}
        label='Required'
        labelVariant='h3'
      />

      <Divider />
      <FormTextField
        name={`${subFieldName}.helpText`}
        label='Help text'
        variant='custom'
        labelVariant='h3'
        placeholder='Text below the field'
      />
      <Flex
        gap={4}
        sx={{
          '.chakra-popover__popper': {
            marginLeft: '-40px !important',
          },
        }}
      >
        <FormDropdown
          labelVariant='h3'
          variant='custom'
          options={options}
          label='Hints'
          name={`${subFieldName}.hint`}
        />
        <DraftEditorField
          name={`${subFieldName}.hintText`}
          label='Help text'
          variant='custom'
          labelVariant='h3'
          placeholder='Hints inside the field'
          type='inline'
        />
      </Flex>
      <Divider />
      {children}
      <Box
        position='relative'
        sx={{
          '.chakra-popover__popper': {
            marginLeft: '15px !important',
          },
        }}
      >
        <FormVariableSelectorDropdown
          label='Save answers in the variable'
          name={`${subFieldName}.name`}
          allowedType='STRING'
        />
      </Box>
    </>
  );
}

export default CommonFields;
