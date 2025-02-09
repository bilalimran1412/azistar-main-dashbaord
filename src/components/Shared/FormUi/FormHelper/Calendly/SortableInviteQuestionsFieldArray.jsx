import { Box, Button, Text } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import React from 'react';
import { seedID } from '../../../../../utils';
import { CalendlyInputFieldItem } from 'components/Shared/SidebarUi';
import { closestCorners, DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';

function SortableInviteQuestionsFieldArray({ name = 'extraQuestion' }) {
  const [field, , helpers] = useField(name);
  const fieldValue = field.value || [];
  const isQuestionLimitFull = fieldValue?.length >= 11;

  const onQuestionAdd = (arrayPushHelper) => {
    arrayPushHelper({
      question: '',
      sortOrder: fieldValue?.length + 1 || 1,
      id: seedID(),
    });
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !fieldValue?.length) {
      return;
    }

    if (active.id !== over.id) {
      const draggedIndex = fieldValue?.findIndex(
        (item) => item.id === `${active.id}`
      );
      const overIndex = fieldValue?.findIndex(
        (item) => item.id === `${over.id}`
      );
      const updatedOrder = arrayMove(fieldValue, draggedIndex, overIndex);
      const sortedBySortOrder = updatedOrder.map((updatedItem, index) => ({
        ...updatedItem,
        sortOrder: index + 1,
      }));
      helpers.setValue(sortedBySortOrder);
    }
  };

  return (
    <Box>
      <Text fontWeight='700' fontSize='14px'>
        Other invitee questions
      </Text>
      <Text fontSize='12px' opacity={0.6} mt={1}>
        If you have added more questions to your Calendly invitation, you can
        add them below so that they can be filled in with the corresponding
        variables (e.g.: User phone number). <br />{' '}
        <Text as='b'>VERY IMPORTANT:</Text> you have to respect the same order
        in which they appear in Calendly.
      </Text>
      <Box>
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <FieldArray name={name}>
            {({ remove, push }) => (
              <Box mt={5} className='fieldArray'>
                <SortableContext
                  strategy={verticalListSortingStrategy}
                  items={fieldValue?.map((item) => item.id) || []}
                >
                  {fieldValue?.map((question, index) => (
                    <CalendlyInputFieldItem
                      question={question}
                      index={index}
                      subFieldName={`${name}[${index}]`}
                      onRemove={() => remove(index)}
                      key={question.id}
                    />
                  ))}
                </SortableContext>

                {!isQuestionLimitFull && (
                  <Button
                    onClick={() => onQuestionAdd(push)}
                    variant='outline'
                    backgroundColor={'#fff'}
                    borderRadius='3px'
                    fontSize='14px'
                    maxH='30px'
                    px='10px'
                    py='5px'
                    textAlign='left'
                    w='100%'
                    verticalAlign='middle'
                    textTransform='uppercase'
                    mt={3}
                  >
                    Add Question Variable
                  </Button>
                )}
              </Box>
            )}
          </FieldArray>
        </DndContext>
      </Box>
    </Box>
  );
}

export { SortableInviteQuestionsFieldArray };
