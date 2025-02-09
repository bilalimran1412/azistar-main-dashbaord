import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { DraftEditorField, FormMediaField } from '../FormUi';
import { FaEdit, FaGripVertical, FaRegCopy, FaTrashAlt } from 'react-icons/fa';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { UiIconButton } from '../UiComponents';

function MessageFieldItem({
  index,
  name,
  item,
  fieldValue,
  onOpen,
  handleCopy,
  handleDelete,
  isLastField,
}) {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  return (
    <Box
      position='relative'
      ref={setNodeRef}
      key={item.id}
      _hover={{ '.iconGroup': { visibility: 'visible' } }}
      _focusWithin={{ '.iconGroup': { visibility: 'hidden' } }}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        position: isDragging ? 'static' : 'relative',
        zIndex: isDragging ? 1 : 'unset',
      }}
    >
      {item.type === 'message' ? (
        <DraftEditorField
          key={item.id}
          name={`${name}[${index}].message`}
          placeholder='Enter your message'
        />
      ) : (
        <FormMediaField value={fieldValue[index].media} />
      )}
      <Flex
        className='iconGroup'
        pos='absolute'
        top='5px'
        right='10px'
        gap={1}
        visibility='hidden'
      >
        {item.type !== 'message' && (
          <UiIconButton
            icon={<FaEdit />}
            onClick={() => {
              onOpen();
            }}
            style={{
              color: 'black',
              background: 'white',
              borderRadius: '3px',
            }}
          />
        )}
        <UiIconButton
          icon={<FaRegCopy />}
          onClick={() => handleCopy()}
          style={{
            color: 'black',
            background: 'white',
            borderRadius: '3px',
          }}
        />
        {!isLastField && (
          <UiIconButton
            icon={<FaTrashAlt />}
            onClick={() => handleDelete()}
            style={{
              color: 'black',
              background: 'white',
              borderRadius: '3px',
            }}
          />
        )}
        <UiIconButton
          icon={<FaGripVertical />}
          label='Drag'
          {...listeners}
          {...attributes}
          style={{
            cursor: 'grab',
            color: 'black',
            background: 'white',
            borderRadius: '3px',
          }}
        />
      </Flex>
    </Box>
  );
}

export default MessageFieldItem;
