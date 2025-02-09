import { Box, Icon, Text } from '@chakra-ui/react';
import { FaGripVertical, FaTrash } from 'react-icons/fa';
import { questionTypes } from './data';
import React from 'react';
import { FormNodePortal } from './FormNodePortal';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UiIconButton } from 'components/Shared/UiComponents';

export function FormQuestionCard({
  question,
  handleQuestionDelete,
  subFieldName,
  id,
  setActiveSidebar,
  activeSidebar,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, data: { type: 'question' } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const questionConfig = questionTypes?.find(
    (type) => type.layoutType === question?.type
  );

  return (
    <Box ref={setNodeRef} style={style} {...attributes}>
      <Box
        backgroundColor='rgb(255, 255, 255)'
        borderRadius='3px'
        padding='12px 8px'
        border='2px solid rgb(99, 97, 240)'
        alignItems='center'
        position='relative'
        color='inherit'
        display='flex'
        flexDirection='row'
        lineHeight='20px'
        cursor='pointer'
        key={question.id}
      >
        <Box padding={2.5}>
          <Icon as={questionConfig?.icon} />
        </Box>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          flex={1}
        >
          <Box>
            <Text>{questionConfig?.title}</Text>
            <Text fontSize='small'>{question?.label}</Text>
          </Box>
          <Box display='flex'>
            <UiIconButton
              color='lightgray'
              fontSize='larger'
              {...listeners}
              _focus={{ backgroundColor: 'transparent' }}
              _hover={{ backgroundColor: 'transparent' }}
              icon={<FaGripVertical />}
            />
            <FormNodePortal
              type={questionConfig?.layoutType}
              subFieldName={subFieldName}
              setActiveSidebar={setActiveSidebar}
              activeSidebar={activeSidebar}
              contentKey={id}
            />
            <UiIconButton
              color='lightgray'
              fontSize='larger'
              icon={<FaTrash />}
              _focus={{ backgroundColor: 'transparent' }}
              _hover={{ backgroundColor: 'transparent' }}
              onClick={handleQuestionDelete}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
