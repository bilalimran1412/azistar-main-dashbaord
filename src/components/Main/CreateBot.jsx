import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

function CreateBot({
  isOpen,
  onClose,
  newBotName,
  newBotDescription,
  setNewBotDescription,
  setNewBotName,
  loading,
  handleCreateBot,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Bot</ModalHeader>
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              value={newBotName}
              onChange={(e) => setNewBotName(e.target.value)}
              placeholder='Enter bot name'
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              value={newBotDescription}
              onChange={(e) => setNewBotDescription(e.target.value)}
              placeholder='Enter bot description'
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme='teal'
            onClick={handleCreateBot}
            mr={3}
            isLoading={loading}
          >
            Create
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CreateBot;
