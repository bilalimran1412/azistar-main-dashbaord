import React from 'react';
import { Box, Flex, FormLabel } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import { ButtonFieldArrayAddButton, MultiQuestionInput } from '../../SidebarUi';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { seedID } from '../../../../utils';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const SortableMultiQuestionFieldArray = ({ label = '', name }) => {
  const [field, , helpers] = useField(name);
  const fieldValue = field.value || [];
  const handleAddButton = (arrayHelpers) => {
    arrayHelpers.push({
      id: seedID(),
      label: '',
      isOpen: true,
      sortOrder: fieldValue?.length + 1,
      config: {
        name: {
          category: 'CUSTOM_VARIABLES',
          label: `multi_question_${fieldValue?.length + 1}`,
          readOnly: false,
          sample: '',
          type: '',
          value: `multi_question_${fieldValue?.length + 1}`,
        },
        type: 'text',
        required: false,
        className: 'full',
        options: [],
        placeholder: '',
        helpText: '',
        defaultValue: '',
        min: '',
        max: '',
        pattern: '',
      },
    });
  };

  const handleDelete = (index, arrayHelpers) => {
    arrayHelpers.remove(index);
  };

  const handleFieldItemPropChange = (index, arrayHelpers, changedProp) => {
    //as this is nested object handle this way to make it work
    const fieldItemToUpdate = {
      ...arrayHelpers.form.values[arrayHelpers.name][index],
      config: {
        ...arrayHelpers.form.values[arrayHelpers.name][index].config,
        ...(changedProp.config || {}),
      },
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
  const handleSettingClick = (index, arrayHelpers) => {
    const currentFields = arrayHelpers.form.values?.[name];

    const updatedFields = currentFields.map((field, i) => ({
      ...field,
      isOpen: i === index ? !field.isOpen : false,
    }));

    arrayHelpers.form.setFieldValue(name, updatedFields);
  };

  return (
    <Box width='100%'>
      <FormLabel>{label}</FormLabel>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={(fieldValue || [])?.map((option) => option.id) || []}
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
                {(fieldValue || [])?.map((fieldItem, index) => (
                  <MultiQuestionInput
                    key={fieldItem.id}
                    id={fieldItem.id}
                    name={`${name}[${index}]`}
                    handleSettingClick={() => {
                      handleSettingClick(index, arrayHelpers);
                    }}
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
                  handleAddButton={() => {
                    handleAddButton(arrayHelpers);
                  }}
                  label='Add a new question'
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

export default SortableMultiQuestionFieldArray;
