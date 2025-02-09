import React from 'react';
import { FieldArray, useField, useFormikContext } from 'formik';
import {
  Button,
  Divider,
  Flex,
  FormLabel,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import MediaSelectModal from '../../SidebarUi/MediaSelectionModal';
import { useNodeContext } from '../../../../views/canvas/NodeContext';
import MessageFieldItem from '../../SidebarUi/MessageFieldItem';
import { fetchWrapper } from '../../../../utils/fetchWrapper';
import { DndContext } from '@dnd-kit/core';
import { seedID } from '../../../../utils';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';

//sortOrder is 0 as one of both with will be picked at a time
export const messageFieldArrayInitialValue = {
  message: [
    {
      type: 'message',
      message: '',
      id: 'd4380a82-2040-56d6-8053-d17eba8db965',
      sortOrder: 1,
    },
  ],
  media: [
    {
      type: 'media',
      media: null,
      id: 'f3d7d05d-2895-54c8-b3d0-fe1b1605dbb2',
      sortOrder: 1,
    },
  ],
};

const MessageMediaField = ({ name, label, onOpen }) => {
  const [field, , helpers] = useField(name);
  // const { values, setFieldValue } = useFormikContext();
  const fieldValue = field?.value || [];

  const handleAddMessage = (arrayHelpers) => {
    arrayHelpers.push({
      type: 'message',
      message: '',
      id: seedID(),
      sortOrder: fieldValue?.length + 1,
    });
  };

  const handleAddMedia = (arrayHelpers) => {
    arrayHelpers.push({
      id: seedID(),
      type: 'media',
      media: null,
      sortOrder: fieldValue?.length + 1,
    });
  };

  const handleDelete = (index, arrayHelpers) => {
    arrayHelpers.remove(index);
  };

  const handleCopy = (index, arrayHelpers) => {
    arrayHelpers.insert(index + 1, {
      ...fieldValue?.[index],
      id: seedID(),
      sortOrder: fieldValue?.length + 1,
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
      const sortedBySortOrder = updatedOrder.map((item, index) => ({
        ...item,
        sortOrder: index + 1,
      }));
      helpers.setValue(sortedBySortOrder);
    }
  };

  const isLastField = fieldValue?.length === 1;

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <SortableContext
            items={fieldValue?.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <VStack align='stretch'>
              <FormLabel variant='h1'>{label}</FormLabel>
              {(fieldValue || [])?.map((item, index) => (
                <MessageFieldItem
                  key={item.id}
                  index={index}
                  item={item}
                  name={name}
                  fieldValue={fieldValue}
                  onOpen={() => onOpen(`${name}[${index}].media`)}
                  handleCopy={() => handleCopy(index, arrayHelpers)}
                  handleDelete={() => handleDelete(index, arrayHelpers)}
                  isLastField={isLastField}
                />
              ))}
              <Divider my={2} />
              <Flex gap={3}>
                <Button
                  colorScheme='black'
                  onClick={() => handleAddMessage(arrayHelpers)}
                  variant='outline'
                  p={3}
                  h={2}
                  fontSize='small'
                  leftIcon={<FaPlus />}
                >
                  Add Message
                </Button>
                <Button
                  colorScheme='black'
                  onClick={() => handleAddMedia(arrayHelpers)}
                  variant='outline'
                  p={3}
                  h={2}
                  fontSize='small'
                  leftIcon={<FaPlus />}
                >
                  Add Media
                </Button>
              </Flex>
            </VStack>
          </SortableContext>
        )}
      />
    </DndContext>
  );
};

function MessageFieldArray({ name, label }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setFieldValue } = useFormikContext();
  const [fieldName, setFieldName] = React.useState('');
  const [file, setFile] = React.useState(null);
  const { currentNodeId } = useNodeContext();
  const uploadFile = async () => {
    if (!file || !currentNodeId) {
      return;
    }
    const url = `/media/${currentNodeId}`;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetchWrapper({
        url,
        method: 'POST',
        body: formData,
      });
      if (response?.fileUrl) {
        setFieldValue(fieldName, response?.fileUrl);
      }
    } catch (error) {}
  };

  const handleSave = async (tabIndex, data) => {
    switch (tabIndex) {
      case 0:
        uploadFile();
        break;

      case 1:
        setFieldValue(fieldName, data);
        break;
      case 2:
        setFieldValue(fieldName, data);
        break;
      case 3:
        setFieldValue(fieldName, data);
        break;
      default:
    }
  };

  const handleChange = (e) => {
    const file = e.target?.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleOpenMediaSelector = (fieldName) => {
    setFieldName(fieldName);
    onOpen();
  };
  return (
    <>
      <MessageMediaField
        name={name}
        label={label}
        onOpen={handleOpenMediaSelector}
      />
      {isOpen && (
        <MediaSelectModal
          onClose={onClose}
          isOpen={isOpen}
          onSaveAction={handleSave}
          onFileSelect={handleChange}
          showVideoTab={true}
        />
      )}
    </>
  );
}

export default MessageFieldArray;
