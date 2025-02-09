// src/components/AddNodes.jsx
import React from 'react';
import { Button } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

function AddNodes({
  onAddNewField,
  onAddNewMessage,
  onAddUploadMedia,
  onAddRating,
  onAddDateField,
  onAddBusinessHours,
}) {
  return (
    <div className='add-nodes'>
      <Button onClick={onAddNewField} leftIcon={<MdAdd />}>
        Add New Field
      </Button>
      <Button onClick={onAddNewMessage} leftIcon={<MdAdd />}>
        Add New Message
      </Button>
      <Button onClick={onAddUploadMedia} leftIcon={<MdAdd />}>
        Add Upload Media
      </Button>
      <Button onClick={onAddRating} leftIcon={<MdAdd />}>
        Add Rating
      </Button>
      <Button onClick={onAddDateField} leftIcon={<MdAdd />}>
        Add Date Field
      </Button>
      <Button onClick={onAddBusinessHours} leftIcon={<MdAdd />}>
        Add Business Hours
      </Button>
    </div>
  );
}

export default AddNodes;
