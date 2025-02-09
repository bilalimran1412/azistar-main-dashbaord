import React from 'react';
import { Box, Divider } from '@chakra-ui/react';
import {
  ButtonFieldArrayAddButton,
  FormQuestionCard,
  FormRowHeader,
} from 'components/Shared/SidebarUi';
import { seedID } from '../../../../utils';
import { FieldArray, useField } from 'formik';
import { RowAddItemMenu } from 'components/Shared/SidebarUi/FormNode/AddRowItemMenu';
import { sideViewLayoutType } from '../../../../config/nodeConfigurations';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  useDroppable,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
const DND_ITEMS_TYPES = {
  QUESTIONS: 'question',
  ROW: 'row',
};
const findActiveQuestion = (activeItem, fieldValue) => {
  if (!activeItem) {
    return null;
  }
  return fieldValue
    ?.flatMap((row) => row?.questions)
    ?.find((question) => question?.id === activeItem?.id);
};

function FormNodeRowsFieldArray({ name, setActiveSidebar, activeSidebar }) {
  const [activeItem, setActiveItem] = React.useState(null);
  const [field, , helpers] = useField(name);
  const arrayHelpersRef = React.useRef(null);
  const fieldValue = field?.value || [];

  const handleAddQuestion = (rowIndex, questionType) => {
    const arrayHelpers = arrayHelpersRef.current;
    if (!arrayHelpers) return;
    const defaultRange = [
      {
        fromDate: '',
        toDate: '',
      },
    ];

    const newQuestion = {
      id: seedID(),
      type: questionType,
      hint: 'placeholder',
      label: '',
      isRequired: false,
      helpText: '',
      hintText: '',
      name: '',
      ...(questionType === sideViewLayoutType.askQuestion && {
        min: 0,
        max: 99999,
        inputSize: 'short',
        pattern: '',
        errorMessage: 'Please enter a valid value',
      }),
      ...(questionType === sideViewLayoutType.date && {
        format: 'yyyy/MM/dd',
        enabledCustomRanges: defaultRange,
        showDatePicker: true,
        enabledDateType: 'all',
        enabledDaysOfWeek: [1, 0, 2, 3, 4, 5, 6],
      }),
      ...(questionType === sideViewLayoutType.askNumber && {
        min: 0,
        max: 0,
        format: '',
        prefix: '',
      }),
      ...(questionType === sideViewLayoutType.askPhone && {
        showCountryCodeSelector: false,
      }),
    };
    const isFirstQuestion = !fieldValue[rowIndex].questions?.length;

    arrayHelpers.replace(rowIndex, {
      ...fieldValue[rowIndex],
      layout: isFirstQuestion ? '1' : '1/2',
      questions: [...fieldValue[rowIndex].questions, newQuestion],
    });
  };

  const handleAddRow = () => {
    const arrayHelpers = arrayHelpersRef.current;
    if (!arrayHelpers) return;
    arrayHelpers?.push({
      questions: [],
      layout: '1',
      id: seedID(),
    });
  };

  const handleQuestionDelete = (rowIndex, questionIndex) => {
    const arrayHelpers = arrayHelpersRef.current;
    if (!arrayHelpers) return;

    const updatedQuestions = fieldValue[rowIndex].questions.filter(
      (q, index) => index !== questionIndex
    );

    arrayHelpers.replace(rowIndex, {
      ...fieldValue[rowIndex],
      questions: updatedQuestions,
    });
  };

  const handleRowDelete = (index) => {
    const arrayHelpers = arrayHelpersRef.current;
    if (!arrayHelpers) return;
    arrayHelpers.remove(index);
  };
  const isLasItem = fieldValue?.length === 1;

  const handleDragStart = (event) => {
    const { active } = event;
    const { id } = active;
    setActiveItem({ id, type: active?.data?.current?.type });
  };

  const handleDragMove = (event) => {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) {
      return;
    }
    // Handling Item Drop Into a Container
    if (
      active.data.current?.type === 'question' &&
      over?.data.current?.type === 'row'
    ) {
      const activeContainer = findValueOfItems(
        active.id,
        DND_ITEMS_TYPES.QUESTIONS
      );
      const overContainer = findValueOfItems(over.id, DND_ITEMS_TYPES.ROW);

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) {
        return;
      }
      // Find the index of the active and over container
      const activeContainerIndex = fieldValue?.findIndex(
        (container) => container.id === activeContainer.id
      );

      const overContainerIndex = fieldValue?.findIndex(
        (container) => container?.id === overContainer?.id
      );
      // Find the index of the active and over item
      const activeItemIndex = activeContainer.questions?.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...fieldValue];

      const [removedItem] = newItems[activeContainerIndex].questions.splice(
        activeItemIndex,
        1
      );

      newItems[overContainerIndex].questions.push(removedItem);
      helpers.setValue(newItems);
      return;
    }
    if (
      active.data.current?.type === DND_ITEMS_TYPES.QUESTIONS &&
      over?.data.current?.type === DND_ITEMS_TYPES.QUESTIONS &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(
        active.id,
        DND_ITEMS_TYPES.QUESTIONS
      );
      const overContainer = findValueOfItems(
        over.id,
        DND_ITEMS_TYPES.QUESTIONS
      );

      // If the active or over container is not found, return
      if (
        !activeContainer ||
        !overContainer ||
        activeContainer.id === overContainer.id
      ) {
        return;
      }

      const activeContainerIndex = fieldValue?.findIndex(
        (container) => container.id === activeContainer.id
      );

      const overContainerIndex = fieldValue?.findIndex(
        (container) => container?.id === overContainer?.id
      );
      // Find the index of the active and over item
      const activeItemIndex = activeContainer.questions?.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = overContainer.questions.findIndex(
        (item) => item.id === over.id
      );
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...fieldValue];
        newItems[activeContainerIndex].questions = arrayMove(
          newItems[activeContainerIndex].questions,
          activeItemIndex,
          overItemIndex
        );

        helpers.setValue(newItems);
      } else {
        // In different containers
        let newItems = [...fieldValue];
        const [removedItem] = newItems[activeContainerIndex].questions.splice(
          activeItemIndex,
          1
        );
        newItems[overContainerIndex].questions.splice(
          overItemIndex,
          0,
          removedItem
        );

        const isOverFull = newItems[overContainerIndex].questions?.length > 2;
        if (isOverFull) {
          const nextRow = newItems[overContainerIndex + 1];

          if (nextRow && nextRow.questions.length < 2) {
            const [lastQuestion] = newItems[
              overContainerIndex
            ].questions.splice(-1, 1);
            newItems[overContainerIndex + 1].questions.push(lastQuestion);
          } else {
            const previousRow = newItems[overContainerIndex - 1];
            if (previousRow && previousRow.questions.length < 2) {
              const [lastQuestion] = newItems[
                overContainerIndex
              ].questions.splice(-1, 1);
              newItems[overContainerIndex - 1].questions.push(lastQuestion);
            }
          }
        }
        helpers.setValue(newItems);
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (
      active.data.current?.type === DND_ITEMS_TYPES.QUESTIONS &&
      over?.data.current?.type === DND_ITEMS_TYPES.QUESTIONS &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(
        active.id,
        DND_ITEMS_TYPES.QUESTIONS
      );
      const overContainer = findValueOfItems(
        over.id,
        DND_ITEMS_TYPES.QUESTIONS
      );

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = fieldValue.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = fieldValue.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeItemIndex = activeContainer.questions.findIndex(
        (item) => item.id === active.id
      );
      const overItemIndex = overContainer.questions.findIndex(
        (item) => item.id === over.id
      );

      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...fieldValue];
        newItems[activeContainerIndex].questions = arrayMove(
          newItems[activeContainerIndex].questions,
          activeItemIndex,
          overItemIndex
        );

        helpers.setValue(newItems);
      } else {
        // In different containers
        let newItems = [...fieldValue];
        const [removedItem] = newItems[activeContainerIndex].questions.splice(
          activeItemIndex,
          1
        );
        newItems[overContainerIndex].questions.splice(
          overItemIndex,
          0,
          removedItem
        );

        helpers.setValue(newItems);
      }
    }
    // Handling item dropping into Container
    if (
      active.data.current?.type === DND_ITEMS_TYPES.QUESTIONS &&
      over?.data.current?.type === DND_ITEMS_TYPES.ROW &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(
        active.id,
        DND_ITEMS_TYPES.QUESTIONS
      );
      const overContainer = findValueOfItems(over.id, DND_ITEMS_TYPES.ROW);

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = fieldValue.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = fieldValue.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeItemIndex = activeContainer.questions.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...fieldValue];
      const [removedItem] = newItems[activeContainerIndex].questions.splice(
        activeItemIndex,
        1
      );
      newItems[overContainerIndex].questions.push(removedItem);

      helpers.setValue(newItems);
    }
    setActiveItem(null);
  };

  const findValueOfItems = (id, type) => {
    if (type === DND_ITEMS_TYPES.ROW) {
      return fieldValue?.find((row) => row.id === id);
    }
    if (type === DND_ITEMS_TYPES.QUESTIONS) {
      return fieldValue?.find((row) =>
        row.questions.find((question) => question?.id === id)
      );
    }
  };
  return (
    <>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
      >
        <FieldArray
          name={name}
          render={(arrayHelpers) => {
            if (!arrayHelpersRef.current) {
              arrayHelpersRef.current = arrayHelpers;
            }
            return (
              <>
                {fieldValue?.map((row, index) => {
                  return (
                    <DroppableRowContainer
                      key={row?.id}
                      row={row}
                      handleAddQuestion={(type) =>
                        handleAddQuestion(index, type)
                      }
                      isLasItem={isLasItem}
                      index={index}
                      subFieldName={`${name}[${index}]`}
                      handleRowDelete={() => handleRowDelete(index)}
                    >
                      <QuestionSortableContext
                        row={row}
                        subFieldName={`${name}[${index}]`}
                        handleAddQuestion={(type) => {
                          handleAddQuestion(index, type);
                        }}
                        handleQuestionDelete={(qIndex) => {
                          handleQuestionDelete(index, qIndex);
                        }}
                        setActiveSidebar={setActiveSidebar}
                        activeSidebar={activeSidebar}
                      />
                    </DroppableRowContainer>
                  );
                })}
              </>
            );
          }}
        />
        <DragOverlay>
          <FormQuestionCard
            key={findActiveQuestion(activeItem, fieldValue)?.id}
            id={findActiveQuestion(activeItem, fieldValue)?.id}
            question={findActiveQuestion(activeItem, fieldValue)}
            subFieldName={'preview'}
            handleQuestionDelete={() => {}}
            active={activeItem?.id}
          />
        </DragOverlay>
      </DndContext>

      <Box>
        <ButtonFieldArrayAddButton
          handleAddButton={handleAddRow}
          containerStyles={{
            backgroundColor: '#9CA3AF',
          }}
          buttonStyles={{
            backgroundColor: '#3A3C5D',
          }}
          label='Add a new row'
        />
      </Box>
    </>
  );
}

export default FormNodeRowsFieldArray;

function QuestionSortableContext({
  row,
  subFieldName,
  handleQuestionDelete,
  handleAddQuestion,
  setActiveSidebar,
  activeSidebar,
}) {
  return (
    <>
      <SortableContext
        items={row.questions.map((q) => q.id)}
        strategy={verticalListSortingStrategy}
      >
        <Box display='flex' flexDirection='column' gap={2}>
          {row.questions.map((question, qIndex) => (
            <FormQuestionCard
              key={question?.id}
              id={question?.id}
              question={question}
              subFieldName={`${subFieldName}.questions[${qIndex}]`}
              handleQuestionDelete={() => {
                handleQuestionDelete(qIndex);
              }}
              setActiveSidebar={setActiveSidebar}
              activeSidebar={activeSidebar}
            />
          ))}
          {row.questions?.length === 1 && (
            <Box width='100%' display='flex' justifyContent='flex-end'>
              <RowAddItemMenu
                onAddQuestion={(type) => {
                  handleAddQuestion(type);
                }}
              />
            </Box>
          )}
        </Box>
      </SortableContext>
    </>
  );
}
function DroppableRowContainer({
  row,
  handleAddQuestion,
  index,
  subFieldName,
  isLasItem,
  handleRowDelete,
  children,
}) {
  const { setNodeRef } = useDroppable({
    id: row?.id,
    data: {
      type: 'row',
    },
  });
  return (
    <React.Fragment key={row.id}>
      <Box display='flex' flexDirection='column' gap={2} ref={setNodeRef}>
        <FormRowHeader
          handleAddQuestion={(type) => handleAddQuestion(type)}
          index={index}
          subFieldName={subFieldName}
          row={row}
          isLasItem={isLasItem}
          handleRowDelete={handleRowDelete}
        />
        {children}
      </Box>
      <Divider />
    </React.Fragment>
  );
}
