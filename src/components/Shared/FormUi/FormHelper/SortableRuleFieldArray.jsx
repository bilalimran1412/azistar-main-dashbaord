import React from 'react';
import { Box, Flex, FormLabel } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import { ButtonFieldArrayAddButton, RuleInputField } from '../../SidebarUi';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { seedID } from '../../../../utils';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const SortableRuleFieldArray = ({
  label = 'Set up scoring rules',
  name,
  ruleGroupIndex,
  selectedVariable,
}) => {
  const [field, , helpers] = useField(name);
  const fieldValue = field.value || [];
  const handleAddButton = (arrayHelpers) => {
    arrayHelpers.push({
      id: seedID(),
      isSettingExpand: false,
      args: ['', ''],
      condition: '',
      scoreSign: '+',
      score: '1',
      sortOrder: fieldValue?.length + 1,
    });
  };

  const handleDelete = (index, arrayHelpers) => {
    arrayHelpers.remove(index);
  };

  const handleFieldItemPropChange = (index, arrayHelpers, changedProp) => {
    const fieldItemToUpdate = {
      ...arrayHelpers.form.values?.ruleGroups[ruleGroupIndex]['rules'][index],

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

  return (
    <Box width='100%'>
      <FormLabel
        style={{
          fontWeight: '700',
          fontSize: '14px',
        }}
      >
        {label}
      </FormLabel>
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
                  <RuleInputField
                    selectedVariable={selectedVariable}
                    key={fieldItem.id}
                    id={fieldItem.id}
                    name={`${name}[${index}]`}
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
                  label='Add a new rule'
                  handleAddButton={() => {
                    handleAddButton(arrayHelpers);
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

export default SortableRuleFieldArray;
