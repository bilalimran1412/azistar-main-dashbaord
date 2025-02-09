import { Box, Button, Flex, FormLabel } from '@chakra-ui/react';
import OptionCreatorFieldItem from './OptionCreatorFieldItem';
import { FieldArray, useField } from 'formik';
import { seedID } from '../../../../utils';
import { useRef } from 'react';
import { closestCenter, DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';

function OptionsCreatorFieldArray({ subFieldName, type }) {
  const [field, , helpers] = useField(`${subFieldName}.options`);
  const arrayHelpersRef = useRef();

  const fieldValue = field.value || [];

  const renderSelectionOptions =
    type === 'select' || type === 'checkbox' || type === 'radio';

  const addOption = () => {
    const arrayHelpers = arrayHelpersRef.current;
    if (!arrayHelpers) {
      return;
    }
    arrayHelpers.push({
      value: '',
      label: '',
      id: seedID(),
      sortOrder: fieldValue?.length + 1,
    });
  };

  const deleteFieldItem = (index) => {
    const arrayHelpers = arrayHelpersRef.current;
    if (!arrayHelpers) {
      return;
    }
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
    <>
      {renderSelectionOptions && (
        <Flex width='100%' direction='column' gap={1}>
          <Box>
            <FormLabel variant='h3' marginLeft={1}>
              Add options
            </FormLabel>
            <Box>
              <DndContext
                onDragEnd={handleDragEnd}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              >
                <Box
                  style={{
                    backgroundColor: '#8a9ba826',
                    borderRadius: '3px',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    padding: '10px 12px 9px',
                    position: 'relative',
                    width: '100%',
                    display: fieldValue?.length ? 'block' : 'none',
                  }}
                >
                  <SortableContext
                    strategy={verticalListSortingStrategy}
                    items={fieldValue?.map((item) => item?.id) || []}
                  >
                    <FieldArray
                      name={`${subFieldName}.options`}
                      render={(arrayHelpers) => {
                        if (!arrayHelpersRef.current) {
                          arrayHelpersRef.current = arrayHelpers;
                        }
                        return (
                          <>
                            {fieldValue.map((option, index) => (
                              <OptionCreatorFieldItem
                                key={option?.id}
                                id={option?.id}
                                subFieldName={`${subFieldName}.options.${index}`}
                                onDelete={() => deleteFieldItem(index)}
                              />
                            ))}
                          </>
                        );
                      }}
                    />
                  </SortableContext>
                </Box>
              </DndContext>
            </Box>
          </Box>
          <Button
            variant={'basic'}
            style={{
              fontSize: '11px',
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: 0,
              outline: 'none',
              minHeight: '0',
              height: 'auto',
              lineHeight: 'inherit',
              border: '1px dashed rgba(255, 255, 255, .2)',
              width: '100%',
            }}
            onClick={addOption}
          >
            Add new option
          </Button>
        </Flex>
      )}
    </>
  );
}
export default OptionsCreatorFieldArray;
// import { Box, Button, FormLabel } from '@chakra-ui/react';
// import OptionCreatorFieldItem from './OptionCreatorFieldItem';
// import { useField, FieldArray } from 'formik';
// import { seedID } from '../../../../../utils';

// function OptionsCreatorFieldArray({ subFieldName, type }) {
//   const [field] = useField(`${subFieldName}.options`);

//   const fieldValue = field.value || [];

//   const renderSelectionOptions =
//     type === 'select' || type === 'checkbox' || type === 'radio';

//   const addOption = (arrayHelpers) => {
//     arrayHelpers.push({ value: '', label: '', id: seedID() });
//   };

//   const deleteFieldItem = (arrayHelpers, index) => {
//     arrayHelpers.remove(index);
//   };

//   return (
//     <>
//       {renderSelectionOptions && (
//         <>
//           <Box>
//             <FormLabel variant='h3' marginLeft={1}>
//               Add options
//             </FormLabel>
//             <Box
//               style={{
//                 backgroundColor: '#8a9ba826',
//                 borderRadius: '3px',
//                 fontSize: '14px',
//                 lineHeight: 1.5,
//                 padding: '10px 12px 9px',
//                 position: 'relative',
//                 width: '100%',
//               }}
//             >
//               <FieldArray name={`${subFieldName}.options`}>
//                 {(arrayHelpers) => (
//                   <>
//                     {fieldValue.map((option, index) => (
//                       <OptionCreatorFieldItem
//                         key={option?.id}
//                         name={`${subFieldName}.options.${index}`}
//                         onRemove={() => deleteFieldItem(arrayHelpers, index)}
//                       />
//                     ))}

//                     <Button
//                       variant={'basic'}
//                       onClick={() => addOption(arrayHelpers)}
//                       style={{
//                         fontSize: '11px',
//                         color: '#fff',
//                         textTransform: 'uppercase',
//                         letterSpacing: 0,
//                         outline: 'none',
//                         minHeight: '0',
//                         height: 'auto',
//                         lineHeight: 'inherit',
//                         border: '1px dashed rgba(255, 255, 255, .2)',
//                       }}
//                     >
//                       Add new option
//                     </Button>
//                   </>
//                 )}
//               </FieldArray>
//             </Box>
//           </Box>
//         </>
//       )}
//     </>
//   );
// }

// export default OptionsCreatorFieldArray;
