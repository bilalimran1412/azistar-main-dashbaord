import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { FormTextField } from '../../FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaGripVertical, FaTrashAlt } from 'react-icons/fa';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function OptionCreatorFieldItem({ onDelete, id, subFieldName }) {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
  });

  return (
    <Flex
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        position: isDragging ? 'static' : 'relative',
        zIndex: isDragging ? 2 : 'unset',
      }}
    >
      <Flex direction='column' flex={1}>
        <Box>
          <FormTextField
            name={`${subFieldName}.label`}
            label=''
            placeholder='Label'
            labelVariant='h3'
            variant='customMini'
            containerSx={{
              marginBottom: 0,
              label: {
                display: 'none',
              },
              input: { height: '30px' },
              'input + div': {
                display: 'none',
              },
            }}
          />
        </Box>
        <Box>
          <FormTextField
            name={`${subFieldName}.value`}
            label=''
            placeholder='Value'
            labelVariant='h3'
            variant='customMini'
            containerSx={{
              marginBottom: 0,
              label: {
                display: 'none',
              },
              input: { height: '30px' },
              'input + div': {
                display: 'none',
              },
            }}
          />
        </Box>
      </Flex>
      <Flex direction='row' alignItems='center'>
        <Box>
          <UiIconButton
            icon={<FaGripVertical />}
            label='Drag'
            {...listeners}
            {...attributes}
            style={{ cursor: 'grab' }}
            _hover={{
              background: '#a7b6c24d',
            }}
            _active={{
              background: '#a7b6c24d',
            }}
          />
        </Box>
        <Box>
          <UiIconButton
            icon={<FaTrashAlt />}
            label='Delete'
            onClick={onDelete}
            _hover={{
              background: '#a7b6c24d',
            }}
            _active={{
              background: '#a7b6c24d',
            }}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default OptionCreatorFieldItem;
