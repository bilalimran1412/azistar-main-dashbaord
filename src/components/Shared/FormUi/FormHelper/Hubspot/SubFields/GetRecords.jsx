import React from 'react';
import {
  DraftEditorField,
  FormDropdown,
  FormVariableSelectorDropdown,
} from '../../../../../Shared/FormUi';
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
const options = [
  { label: 'Contact', value: 'contact' },
  { label: 'Company', value: 'company' },
  { label: 'Deal', value: 'deal' },
  { label: 'Ticket', value: 'ticket' },
];
function GetRecords() {
  return (
    <>
      <FormDropdown
        name='resourceType'
        placeholder='Select'
        variant='custom'
        options={options}
      />
      <Flex gap={2}>
        <DynamicDropdown subFieldName='filter.field' filterKey='company' />
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
      <FormVariableSelectorDropdown
        name='results'
        label='Save your result into a field'
      />
    </>
  );
}

export { GetRecords };
