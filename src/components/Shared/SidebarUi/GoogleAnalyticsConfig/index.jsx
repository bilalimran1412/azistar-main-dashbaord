import { AzistarForm, FormTextField } from '../../FormUi';
import { CodeEditor, CustomModal } from 'components/Shared/UiComponents';
import { yup } from '../../../../utils/yup';
import { useNodeContext } from 'views/canvas/NodeContext';
import { FileSelector } from '..';
import {
  Box,
  Button,
  Divider,
  FormLabel,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { MdFullscreen } from 'react-icons/md';
import React from 'react';

function GoogleAnalyticsConfigForm({ id, onClose, isOpen }) {
  const { getNodeById, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const initialValues = {
    title: currentNode?.data?.params?.googleAnalyticsConfig?.title || '',
    description:
      currentNode?.data?.params?.googleAnalyticsConfig?.description || '',
    googleAnalyticsID:
      currentNode?.data?.params?.googleAnalyticsConfig?.googleAnalyticsID || '',
    metaImage:
      currentNode?.data?.params?.googleAnalyticsConfig?.metaImage || '',
    favIcon: currentNode?.data?.params?.googleAnalyticsConfig?.favIcon || '',
    snippets: currentNode?.data?.params?.googleAnalyticsConfig?.snippets || '',
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    updateNodeById(id, {
      params: {
        ...currentNode?.data?.params,
        googleAnalyticsConfig: formValues,
      },
    });
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title='Seo & Tracking'
      footer={
        <>
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
              type='reset'
              form='googleAnalyticsConfig'
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              // variant=''
              colorScheme='blue'
              type='submit'
              form='googleAnalyticsConfig'
            >
              Save
            </Button>
          </Box>
        </>
      }
    >
      <AzistarForm
        onSave={onSave}
        validationSchema={validationSchema}
        initialValues={initialValues}
        formID='googleAnalyticsConfig'
      >
        <FormTextField
          name='title'
          label='Meta title'
          placeholder='Get more leads using chatbots'
          labelVariant='h3'
          variant='custom'
        />
        <Divider />
        <ImageSection />
        <Divider />
        <FormTextField
          name='description'
          label='Site description (for search engines)'
          placeholder='Azistar is a chatbot tool. It automates chatbot flows.'
          labelVariant='h3'
          type='textarea'
        />
        <Divider />

        <FormTextField
          name='googleAnalyticsID'
          label='Google Analytics ID'
          placeholder=''
          labelVariant='h3'
          variant='custom'
        />
        <Divider />
        <ScriptField />
      </AzistarForm>
    </CustomModal>
  );
}
export { GoogleAnalyticsConfigForm };

function ImageSection() {
  const { values: fieldValue, setFieldValue } = useFormikContext();
  const onFileSelect = (name, file) => {
    setFieldValue(name, file);
  };
  return (
    <>
      <FileSelector
        sectionLabel='Upload your Meta image'
        imageSrc={fieldValue.metaImage}
        textStyles={{
          color: 'black',
        }}
        onFileSelect={(metaImage) => {
          onFileSelect('metaImage', metaImage);
        }}
      />
      <Divider />
      <FileSelector
        sectionLabel='Upload your Fav Icon'
        imageSrc={fieldValue.favIcon}
        textStyles={{
          color: 'black',
        }}
        onFileSelect={(favIcon) => {
          onFileSelect('favIcon', favIcon);
        }}
      />
    </>
  );
}
function ScriptField() {
  const { values, setFieldValue } = useFormikContext();
  const [editorValue, setEditorValue] = React.useState(values.snippets);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChange = React.useCallback((val, viewUpdate) => {
    setEditorValue(val);
  }, []);

  const onModalSave = () => {
    setFieldValue('snippets', editorValue);
    onClose();
  };

  const onModalClose = () => {
    setEditorValue(values.snippets);
    onClose();
  };

  const onEditorBlur = () => {
    setFieldValue('snippets', editorValue);
  };

  return (
    <>
      <Box>
        <FormLabel variant='h3'>Custom Tracking Snippets</FormLabel>
        <Text fontSize='12px' mb={2}>
          This HTML will be added in the &nbsp;
          <Text as='span' color='red' fontSize='12px'>
            &lt;head&gt;
          </Text>
          &nbsp; section of your bot. You can add JavaScript making sure you do
          it inside the &nbsp;{' '}
          <Text as='span' color='red' fontSize='12px'>
            &lt;script&gt;&lt;/script&gt;
          </Text>
          &nbsp;tags.
        </Text>
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
                  <Button
                    colorScheme='blue'
                    type='button'
                    onClick={onModalSave}
                  >
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
    </>
  );
}
