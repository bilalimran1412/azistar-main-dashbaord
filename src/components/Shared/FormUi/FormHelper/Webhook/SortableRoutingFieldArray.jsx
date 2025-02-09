import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  ButtonFieldArrayAddButton,
  RoutingInputFieldItem,
} from 'components/Shared/SidebarUi';
import { seedID } from '../../../../../utils';

const SortableRoutingFieldArray = ({ name }) => {
  const [field, , helpers] = useField(name);
  const fieldValue = field.value || [];

  const handleAddButton = (arrayHelpers) => {
    arrayHelpers.push({
      id: seedID(),
      text: '',
      sortOrder: fieldValue?.length + 1,
    });
  };

  const handleDelete = (index, arrayHelpers) => {
    arrayHelpers.remove(index);
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
    <Box width='100%'>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={fieldValue?.map((option) => option.id) || []}
        >
          <FieldArray
            name={name}
            render={(arrayHelpers) => (
              <Flex
                bgColor={'#42456A'}
                padding='10px'
                rounded={'3px'}
                width='100%'
                direction='column'
                gap={3}
                overflow='hidden'
                whiteSpace='nowrap'
              >
                {fieldValue?.map((fieldItem, index) => (
                  <RoutingInputFieldItem
                    key={fieldItem.id}
                    id={fieldItem.id}
                    name={`${name}[${index}]`}
                    handleDeleteClick={() => handleDelete(index, arrayHelpers)}
                  />
                ))}
                <ButtonFieldArrayAddButton
                  handleAddButton={() => {
                    handleAddButton(arrayHelpers);
                  }}
                />
              </Flex>
            )}
          />
        </SortableContext>
      </DndContext>
    </Box>
  );
};

export { SortableRoutingFieldArray };
