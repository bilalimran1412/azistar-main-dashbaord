import React from 'react';
import {
  SendRequest,
  SidebarFormCard,
  SidebarFormContainer,
} from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { TriggerAutomationFieldArray } from '../Shared/FormUi';

function TriggerAutomationNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);
  //TODO MOVE TO CONFIG
  const initialValues = {
    url: currentNode?.data?.params?.url || 'https://',
    parameters: currentNode?.data?.params?.parameters || [{ testValue: '' }],
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const nodeTextContent = formValues.url;
    updateNodeById(id, {
      params: { ...formValues, ...(nodeTextContent && { nodeTextContent }) },
    });
    handleClose();
  };

  return (
    <SidebarFormContainer
      block={config}
      onClose={handleClose}
      onFormSave={onSave}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onReset={handleClose}
    >
      <SidebarFormCard
        title='Paste the Webhook URL'
        contentContainerProps={{
          style: { display: 'flex' },
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Text fontSize='12px'>
          Paste here the Webhook url provided by the webhook trigger in your
          automation platform
        </Text>
        <PostInputField />
        <InputPreview />
      </SidebarFormCard>
      <SidebarFormCard
        title='Set data (variables) to be sent'
        contentContainerProps={{
          style: { display: 'flex' },
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Text fontSize='14px' fontWeight='700'>
          Manually set test values for variables
        </Text>
        <Text fontSize='12px'>
          Use the inputs below to set up the variables data that you want to
          send. The "Test value" will be used only in the test to help you set
          up your webhook trigger
        </Text>
        <TriggerAutomationFieldArray name='parameters' />
        <SendRequest type='trigger' />
      </SidebarFormCard>
    </SidebarFormContainer>
  );
}

export default TriggerAutomationNodeContent;

const PostInputField = () => {
  const { setFieldValue, values } = useFormikContext();
  return (
    <InputGroup>
      <InputLeftElement
        children={
          <Box
            bg='rgb(99, 108, 225)'
            color='white'
            padding='0 10px'
            display='flex'
            alignItems='center'
            height='25px'
          >
            <Text>POST</Text>
          </Box>
        }
        style={{
          left: '16px',
          top: '1px',
        }}
      />
      <Input
        placeholder='https://'
        variant='custom'
        value={values?.url || ''}
        paddingLeft='80px'
        width='full'
        onChange={(event) => {
          const value = event.target.value;
          setFieldValue('url', value);
        }}
      />
    </InputGroup>
  );
};

const InputPreview = () => {
  const { values } = useFormikContext();
  return (
    <>
      {values?.url && (
        <Box bg='#646de117' p={4} borderRadius='3px'>
          <Text fontSize='9px' opacity={0.7}>
            PREVIEW URL
          </Text>

          <Text fontSize='12px' opacity={0.7} mt={2}>
            {values?.url}
          </Text>
        </Box>
      )}
    </>
  );
};
