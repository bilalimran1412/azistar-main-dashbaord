import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { DraftEditorField } from '../../FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaGripVertical, FaTrashAlt } from 'react-icons/fa';
import { CSS } from '@dnd-kit/utilities';

function CalendlyInputFieldItem({ onRemove, subFieldName, question, index }) {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: question.id,
  });

  return (
    <Box
      key={question.id}
      mt={3}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        position: isDragging ? 'static' : 'relative',
        zIndex: isDragging ? 1 : 'unset',
      }}
    >
      <Flex direction='row' alignItems='center'>
        <DraftEditorField
          name={`${subFieldName}.question`}
          label={`Question ${index + 1}`}
          placeholder='Value'
          variant='custom'
          labelVariant='h1'
          type='inline'
        />
        <Flex mt={-1}>
          <Box>
            <UiIconButton
              icon={<FaGripVertical />}
              label='Drag'
              style={{ cursor: 'grab' }}
              color='black'
              {...attributes}
              {...listeners}
            />
          </Box>
          <Box>
            <UiIconButton
              icon={<FaTrashAlt />}
              label='Delete'
              color='black'
              onClick={onRemove}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export { CalendlyInputFieldItem };
