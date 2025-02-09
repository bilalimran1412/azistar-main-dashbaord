import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import {
  FormDropdown,
  FormVariableSelectorDropdown,
} from '../../FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaTrashAlt } from 'react-icons/fa';

function SaveResponseFieldItem({
  onRemove,
  subFieldName,
  isLastItem,
  dropdownOptions,
}) {
  return (
    <Box mt={3}>
      <Flex direction='column' width='100%' alignItems='flex-end'>
        <Box width='100%'>
          <FormDropdown
            label=''
            placeholder='Save Response'
            name={`${subFieldName}.response`}
            options={dropdownOptions}
            variant='custom'
          />
          <FormVariableSelectorDropdown
            name={`${subFieldName}.variable`}
            label=''
          />
        </Box>
        {!isLastItem && (
          <Flex mt={4}>
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

export { SaveResponseFieldItem as HubspotSaveResponseFieldItem };
