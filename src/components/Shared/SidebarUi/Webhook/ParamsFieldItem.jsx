import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { DraftEditorField, FormTextField } from '../../FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaTrashAlt } from 'react-icons/fa';

function ParamsFieldItem({ onRemove, subFieldName, item, isLastItem }) {
  return (
    <Box key={item.id} mt={3}>
      <Flex direction='row' alignItems='flex-start'>
        <FormTextField
          name={`${subFieldName}.key`}
          label={`Key`}
          placeholder='key'
          variant='custom'
          labelVariant='h1'
        />
        <DraftEditorField
          name={`${subFieldName}.value`}
          label={`Value`}
          placeholder='value'
          variant='custom'
          labelVariant='h1'
          type='inline'
          setOnlyText={true}
        />
        {!isLastItem && (
          <Flex mt={8}>
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

export { ParamsFieldItem };
