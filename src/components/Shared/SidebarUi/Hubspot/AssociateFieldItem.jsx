import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { DraftEditorField, FormDropdown } from '../../FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaTrashAlt } from 'react-icons/fa';
const options = [
  { label: 'Contact ID', value: 'contact' },
  { label: 'Company ID', value: 'company' },
  { label: 'Deal ID', value: 'deal' },
  { label: 'Ticket ID', value: 'ticket' },
];
function AssociateFieldItem({ onRemove, subFieldName, item }) {
  return (
    <Box key={item.id} mt={1}>
      <Flex direction='row' alignItems='flex-start' gap={1}>
        <FormDropdown
          name={`${subFieldName}.key`}
          placeholder='Select'
          variant='custom'
          options={options}
        />
        <DraftEditorField
          name={`${subFieldName}.value`}
          placeholder='Introduce your value'
          variant='custom'
          type='inline'
          containerStyles={{
            maxWidth: '185px',
            minWidth: '185px',
          }}
        />
        <Box>
          <UiIconButton
            icon={<FaTrashAlt />}
            label='Delete'
            color='black'
            onClick={onRemove}
          />
        </Box>
      </Flex>
    </Box>
  );
}

export { AssociateFieldItem };
