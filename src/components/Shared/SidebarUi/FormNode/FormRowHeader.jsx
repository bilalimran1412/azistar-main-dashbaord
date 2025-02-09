import { Box, Text } from '@chakra-ui/react';
import { UiIconButton } from 'components/Shared/UiComponents';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { RowLayout } from './RowLayout';
import { RowAddItemMenu } from './AddRowItemMenu';

function FormRowHeader({
  row,
  index,
  handleAddQuestion,
  isLasItem,
  handleRowDelete,
  subFieldName,
}) {
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Box display='flex' flex='1 1 0%'>
        <Text
          fontFamily="'DM Sans', sans-serif"
          fontSize='2rem'
          fontWeight='500'
          letterSpacing='-0.5px'
          lineHeight='40px'
        >
          Row {index + 1}
        </Text>
      </Box>
      <Box>
        {!!row?.questions?.length && (
          <Box display='flex' gap={2}>
            {!isLasItem && (
              <UiIconButton
                icon={<FaTrash />}
                onClick={handleRowDelete}
                background='#d2d5da'
                _active={{ backgroundColor: '#d2d5da' }}
                _focus={{ backgroundColor: '#d2d5da' }}
              />
            )}
            <Box>
              <RowLayout subFieldName={`${subFieldName}`} rowIndex={index} />
            </Box>
          </Box>
        )}
        {!row?.questions?.length && (
          <Box display='flex' gap={2} alignItems='center'>
            {isLasItem ? (
              <Text>Add a question</Text>
            ) : (
              <UiIconButton
                onClick={handleRowDelete}
                icon={<FaTrash />}
                background='#d2d5da'
                _active={{ backgroundColor: '#d2d5da' }}
                _focus={{ backgroundColor: '#d2d5da' }}
              />
            )}
            <RowAddItemMenu onAddQuestion={handleAddQuestion} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export { FormRowHeader };
