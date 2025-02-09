import React from 'react';
import { Button, Icon, Box } from '@chakra-ui/react';
import { FaUpload } from 'react-icons/fa';
import MediaSelectModal from './MediaSelectionModal';

const UploadButton = ({
  onFileSelect,
  onSave,
  buttonText = 'Select',
  isSelectorModalOpen,
  openSelectorModal,
  closeSelectorModal,
}) => {
  const handleChange = (e) => {
    const file = e.target?.files[0];
    if (file) {
      onFileSelect(file);
    }
  };
  const handleSaveAction = (tabIndex, data) => {
    onSave(tabIndex, data);
  };

  return (
    <Box>
      <Button
        bg='white'
        color='black'
        border='1px'
        borderColor='gray.300'
        _hover={{ bg: 'gray.100' }}
        _active={{ bg: 'gray.200' }}
        leftIcon={<Icon as={FaUpload} color='black' />}
        variant='solid'
        p='10px 20px'
        onClick={openSelectorModal}
      >
        {buttonText}
      </Button>

      {isSelectorModalOpen && (
        <MediaSelectModal
          onClose={closeSelectorModal}
          isOpen={isSelectorModalOpen}
          onSaveAction={handleSaveAction}
          onFileSelect={handleChange}
        />
      )}
    </Box>
  );
};

export default UploadButton;
