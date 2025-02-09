import React from 'react';
import ImageEditor from './ImageEditor';
import CustomModal from '../CustomModal';

export function ImageEditorModal({
  onClose,
  isOpen,
  getCroppedImage,
  imageSrc,
}) {
  return (
    <CustomModal
      onClose={onClose}
      isOpen={isOpen}
      title='Edit image fit'
      footer={<></>}
      size='xl'
    >
      <ImageEditor
        onClose={onClose}
        imageSrc={imageSrc}
        getCroppedImage={getCroppedImage}
      />
    </CustomModal>
  );
}
