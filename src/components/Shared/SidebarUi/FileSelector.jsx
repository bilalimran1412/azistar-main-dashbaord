import React, { useState } from 'react';
import { Box, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';
import UploadButton from './UploadButton';
import { fetchWrapper } from '../../../utils/fetchWrapper';
import { useNodeContext } from '../../../views/canvas/NodeContext';
import { ImageEditorModal, UiIconButton } from '../UiComponents';
import { FaTrashAlt } from 'react-icons/fa';
import { fileToBlobURL } from '../UiComponents/ImageEditor/utils';

const FileSelector = ({
  onFileSelect,
  imageSrc,
  sectionLabel = 'Upload an image',
  buttonText = 'Select',
  editImage = false,
  textStyles = { color: 'white' },
}) => {
  const [file, setFile] = useState(null);
  const { currentNodeId } = useNodeContext();

  const {
    isOpen: isSelectorModalOpen,
    onOpen: openSelectorModal,
    onClose: closeSelectorModal,
  } = useDisclosure();

  const {
    onClose: onCloseImageEditor,
    isOpen: isImageEditorOpen,
    onOpen: openImageEditor,
  } = useDisclosure();

  const handleFileSelect = async (file) => {
    if (editImage) {
      const imageSrc = fileToBlobURL(file);
      setFile(imageSrc);
      openImageEditor();
    } else setFile(file);
  };

  const uploadFile = async (croppedImage) => {
    if (!file || !currentNodeId) {
      return;
    }
    const url = `/media/${currentNodeId}`;
    const formData = new FormData();
    formData.append('file', croppedImage ? croppedImage : file);

    try {
      const response = await fetchWrapper({
        url,
        method: 'POST',
        body: formData,
      });
      if (response?.fileUrl) {
        onFileSelect(response?.fileUrl);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleSave = async (tabIndex, data) => {
    console.log('saving');
    switch (tabIndex) {
      case 0:
        await uploadFile();
        break;

      case 1:
        onFileSelect(data);
        break;
      case 2:
        onFileSelect(data);
        break;

      default:
    }
  };

  const handleImageEditorClose = () => {
    setFile('');
    onCloseImageEditor();
  };

  const getCroppedImage = (croppedImage) => {
    if (croppedImage) {
      uploadFile(croppedImage);
      closeSelectorModal();
    }
  };

  return (
    <Flex
      flexWrap={'wrap'}
      alignItems={'center'}
      minH='50px'
      width={'100%'}
      gap={3}
      bg={'#8a9ba826'}
      borderColor={'gray'}
      borderRadius={'4px'}
      p={'10px 12px 9px'}
    >
      {sectionLabel && (
        <Text
          style={{
            margin: '0',
            padding: '0',
            textAlign: 'start',
            width: '100%',
            ...textStyles,
          }}
        >
          {sectionLabel}
        </Text>
      )}
      <Box display={'flex'} alignItems={'center'} width={'100%'}>
        <UploadButton
          onFileSelect={handleFileSelect}
          onSave={handleSave}
          buttonText={buttonText}
          isSelectorModalOpen={isSelectorModalOpen}
          openSelectorModal={openSelectorModal}
          closeSelectorModal={closeSelectorModal}
        />
        {imageSrc && (
          <Box ml='10px' display='flex' gap={3}>
            <Image
              src={imageSrc}
              alt='icon'
              boxSize='40px'
              objectFit='cover'
              style={{ borderRadius: '4px' }}
            />
            <UiIconButton
              icon={<FaTrashAlt />}
              label='Delete'
              onClick={() => {
                onFileSelect('');
              }}
              style={{ ...textStyles }}
            />
          </Box>
        )}
      </Box>
      {editImage && isImageEditorOpen && (
        <ImageEditorModal
          isOpen={isImageEditorOpen}
          getCroppedImage={getCroppedImage}
          imageSrc={file}
          onClose={handleImageEditorClose}
        />
      )}
    </Flex>
  );
};

export default FileSelector;
