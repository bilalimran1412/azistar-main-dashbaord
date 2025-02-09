import React from 'react';
import { Box, FormLabel, Button, useDisclosure } from '@chakra-ui/react';
import { MdFullscreen } from 'react-icons/md';
import { useFormikContext } from 'formik';
import { CodeEditor, CustomModal } from '../UiComponents';

const CodeEditorField = ({ name, label }) => {
  const { values, setFieldValue } = useFormikContext();
  const [editorValue, setEditorValue] = React.useState(values[name]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChange = React.useCallback((val) => {
    setEditorValue(val);
  }, []);

  const onModalSave = () => {
    setFieldValue(name, editorValue);
    onClose();
  };

  const onModalClose = () => {
    setEditorValue(values[name]);
    onClose();
  };

  const onEditorBlur = () => {
    setFieldValue(name, editorValue);
  };

  return (
    <Box>
      <FormLabel variant='h3'>{label}</FormLabel>
      <Box
        position='relative'
        sx={{
          _hover: {
            '.fullscreen': {
              visibility: 'visible',
            },
          },
        }}
      >
        <CodeEditor
          value={editorValue}
          height='300px'
          theme='dark'
          editable={true}
          onChange={onChange}
          onBlur={onEditorBlur}
        />
        <Box
          position='absolute'
          bottom='20px'
          padding={2}
          bgColor='white'
          right='10px'
          visibility='hidden'
          className='fullscreen'
          cursor='pointer'
          onClick={onOpen}
        >
          <MdFullscreen />
        </Box>
        {isOpen && (
          <CustomModal
            onClose={onModalClose}
            isOpen={isOpen}
            isCentered
            size='5xl'
            footer={
              <Box
                m={6}
                mb={2}
                display='flex'
                justifyContent='flex-end'
                alignItems='center'
                gap={3}
              >
                <Button
                  variant='outline'
                  colorScheme='blue'
                  type='button'
                  onClick={onModalClose}
                >
                  Close
                </Button>
                <Button colorScheme='blue' type='button' onClick={onModalSave}>
                  Save
                </Button>
              </Box>
            }
          >
            <CodeEditor
              value={editorValue}
              height='600px'
              theme='dark'
              editable={true}
              onChange={onChange}
            />
          </CustomModal>
        )}
      </Box>
    </Box>
  );
};

export { CodeEditorField };
