import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
const CustomOverlay = () => (
  <ModalOverlay
  // bg='blackAlpha.300'
  // backdropFilter='blur(10px) hue-rotate(90deg)'
  />
);

function CustomModal({
  children,
  onClose,
  isOpen,
  title,
  onSave,
  footer,
  size = 'lg',
  isCentered = true,
}) {
  return (
    <>
      <Modal
        isCentered={isCentered}
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        scrollBehavior='inside'
      >
        <CustomOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          {footer ? (
            <>{footer}</>
          ) : (
            <ModalFooter>
              <Button variant='ghost' onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue' ml={3} onClick={onSave}>
                Save
              </Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
export default CustomModal;
