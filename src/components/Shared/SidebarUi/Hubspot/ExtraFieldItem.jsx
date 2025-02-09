import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { DraftEditorField } from '../../FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaTrashAlt } from 'react-icons/fa';
import { DynamicDropdown } from './DynamicDropdown';

function ExtraFieldItem({ onRemove, subFieldName, item }) {
  return (
    <Box key={item.id} mt={1}>
      <Flex direction='row' alignItems='flex-start' gap={1}>
        <DynamicDropdown subFieldName={`${subFieldName}.key`} />
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

export { ExtraFieldItem };
