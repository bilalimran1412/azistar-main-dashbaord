import React from 'react';
import {
  DraftEditorField,
  ExtraFieldsArray,
  FormDropdown,
} from '../../../../FormUi';
import { Flex } from '@chakra-ui/react';
import { DynamicDropdown } from 'components/Shared/SidebarUi';

const filterOptions = [
  { label: 'Contains', value: 'contains' },
  { label: 'Does Not Contain', value: 'not_contains' },
  { label: 'Equals', value: 'equals' },
  { label: 'Does Not Equal', value: 'not_equals' },
  { label: 'Less Than', value: 'less_than' },
  { label: 'Less Than or Equal To', value: 'less_than_or_equal' },
  { label: 'Greater Than', value: 'greater_than' },
  { label: 'Greater Than or Equal To', value: 'greater_than_or_equal' },
];

function UpdateField() {
  return (
    <>
      <Flex gap={2}>
        <DynamicDropdown subFieldName='filter.field' />
        <FormDropdown
          name='filter.operator'
          placeholder='Select Filter type'
          variant='custom'
          labelVariant='h1'
          options={filterOptions}
        />
      </Flex>
      <DraftEditorField
        name='filter.value'
        placeholder='Introduce your value'
        variant='custom'
        type='inline'
        labelVariant='h1'
      />
      <ExtraFieldsArray name='extra' label='Update Record Values' />
    </>
  );
}

export { UpdateField };
