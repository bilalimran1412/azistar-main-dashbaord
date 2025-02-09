import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import { ButtonFieldArrayAddButton, PictureCardItem } from '../../SidebarUi';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { seedID } from '../../../../utils';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const SortablePictureCardFieldArray = ({ name }) => {
  const [field, , helpers] = useField(name);
  const fieldValue = field.value || [];
  const handleAddCard = (arrayHelpers) => {
    const currentFields = arrayHelpers.form.values?.[name];

    const updatedFields = (currentFields || [])?.map((field) => ({
      ...field,
      isOpen: false,
    }));

    const newCard = {
      id: seedID(),
      text: '',
      externalLink: '',
      isOpen: true,
      buttonText: '',
      description: '',
      details: '',
      highlighted: '',
      image: '',
      footerImage: '',
      sortOrder: fieldValue?.length || 1,
    };
    arrayHelpers.form.setFieldValue(name, [...(updatedFields || []), newCard]);
  };

  const handleDelete = (index, arrayHelpers) => {
    arrayHelpers.remove(index);
  };

  const handleFieldItemPropChange = (index, arrayHelpers, changedProp) => {
    const fieldItemToUpdate = {
      ...arrayHelpers.form.values[arrayHelpers.name][index],
      ...(changedProp && { ...changedProp }),
    };

    arrayHelpers.replace(index, fieldItemToUpdate);
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

  const handleConfigsClick = (index, arrayHelpers) => {
    const currentFields = arrayHelpers.form.values?.[name];

    const updatedFields = currentFields.map((field, i) => ({
      ...field,
      isOpen: i === index ? !field.isOpen : false,
    }));

    arrayHelpers.form.setFieldValue(name, updatedFields);
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
                  <PictureCardItem
                    key={fieldItem.id}
                    isSortable={true}
                    id={fieldItem.id}
                    name={`${name}[${index}]`}
                    handleConfigsClick={() =>
                      handleConfigsClick(index, arrayHelpers)
                    }
                    handleDeleteClick={() => handleDelete(index, arrayHelpers)}
                    handleFieldItemPropChange={(changedProp) => {
                      handleFieldItemPropChange(
                        index,
                        arrayHelpers,
                        changedProp
                      );
                    }}
                  />
                ))}
                <ButtonFieldArrayAddButton
                  label='Add a New Card'
                  handleAddButton={() => {
                    handleAddCard(arrayHelpers);
                  }}
                  buttonStyles={{
                    color: '#3a3c5d',
                    backgroundColor: '#fff',
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

export default SortablePictureCardFieldArray;
