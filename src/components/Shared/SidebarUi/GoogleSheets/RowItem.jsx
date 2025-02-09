import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import {
  FormDropdown,
  FormVariableSelectorDropdown,
} from '../../FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaTrashAlt } from 'react-icons/fa';

function RowItem({ onRemove, subFieldName, isLastItem, dropdownOptions }) {
  return (
    <Box bg='#8a9ba826' borderRadius='3px' p='10px 12px 9px'>
      <Flex direction='column' width='100%' alignItems='flex-end'>
        <Box width='100%'>
          <FormDropdown
            label=''
            placeholder='Select the field'
            name={`${subFieldName}.field`}
            options={dropdownOptions}
            variant='custom'
          />
          <FormVariableSelectorDropdown
            name={`${subFieldName}.variable`}
            placeholder='Select a variable'
            label=''
          />
        </Box>
        {!isLastItem && (
          <Flex mt={3}>
            <Box>
              <UiIconButton
                icon={<FaTrashAlt />}
                label='Delete'
                color='black'
                onClick={onRemove}
              />
            </Box>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}

export { RowItem };
