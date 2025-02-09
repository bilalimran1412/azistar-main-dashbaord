import React from 'react';
import { Divider, Flex, Image, Text } from '@chakra-ui/react';
import {
  DraftEditorField,
  FormSettings,
  FormTextField,
} from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';

function GoodByeNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    // fields: config.fields,
    //this message will contain all the ops and html and normal text
    message: currentNode?.data?.params?.message,
    //this message will contain all the ops and html and normal text
    redirectMessage: currentNode?.data?.params?.redirectMessage,

    socialEnable:
      currentNode?.data?.params?.socialEnable ||
      config?.data?.params.socialEnable,
    startButtonEnable:
      currentNode?.data?.params?.startButtonEnable ||
      config?.data?.params.startButtonEnable,
    redirectEnable:
      currentNode?.data?.params?.redirectEnable ||
      config?.data?.params.redirectEnable,
    socialUrl:
      currentNode?.data?.params?.socialUrl || config?.data?.params.socialUrl,
    socialUrlText:
      currentNode?.data?.params?.socialUrlText ||
      config?.data?.params.socialUrlText,
    startButtonText:
      currentNode?.data?.params?.startButtonText ||
      config?.data?.params.startButtonText,
    redirectUrl:
      currentNode?.data?.params?.redirectUrl ||
      config?.data?.params.redirectUrl,
    redirectTimeout:
      currentNode?.data?.params?.redirectTimeout ||
      config?.data?.params.redirectTimeout,
  };

  const validationSchema = yup.object({
    message: yup.mixed().required('Good bye message is required'),
  });

  const onSave = (formValues) => {
    console.log('Good bye node Form values=>>>', formValues);
    updateNodeById(id, {
      params: {
        ...formValues,
      },
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
      <DraftEditorField
        name='message'
        placeholder={config.fields.placeholder}
        label={config.fields.label}
        labelVariant='h1'
      />
      <Divider />
      <FormSettings
        name='socialEnable'
        label='Social share icons'
        infoText='Add buttons to this message to let your users share this chatbot in the popular social networks'
        bgColor='inherit'
        labelVariant='h2'
        containerStyles={{ padding: 0 }}
        labelProps={{ style: { cursor: 'pointer' } }}
      >
        <FormTextField
          placeholder='https://'
          name='socialUrl'
          label='Url social share'
          labelVariant='h3'
          variant='custom'
        />
        <FormTextField
          placeholder=''
          name='socialUrlText'
          label='Share description'
          labelVariant='h3'
          variant='custom'
        />
        <Flex marginLeft={1} direction='column' gap={2}>
          <Text>Example:</Text>
          <Image src='/assets/goodbye-share.png' />
        </Flex>
      </FormSettings>
      <Divider />
      <FormSettings
        name='startButtonEnable'
        label='Start again button'
        infoText='This will provide buttons to start again the conversation (going back to the first flow message)'
        bgColor='inherit'
        labelVariant='h2'
        containerStyles={{ padding: 0 }}
        labelProps={{ style: { cursor: 'pointer' } }}
      >
        <FormTextField
          placeholder='Click to edit'
          name='startButtonText'
          label=''
          labelVariant='h3'
          variant='custom'
        />
      </FormSettings>
      <Divider />
      <FormSettings
        name='redirectEnable'
        label='Redirect to url'
        bgColor='inherit'
        labelVariant='h2'
        containerStyles={{ padding: 0 }}
        labelProps={{ style: { cursor: 'pointer' } }}
      >
        <FormTextField
          placeholder='https://'
          name='redirectUrl'
          label='Url to redirect'
          labelVariant='h3'
          variant='custom'
        />
        <DraftEditorField
          label='Type here your redirect message (use {timeout} as dynamic countdown)'
          placeholder='Redirecting you in {timeout}...'
          name='redirectMessage'
          labelVariant='h3'
        />
        <FormTextField
          placeholder='Enter time'
          name='redirectTimeout'
          label='Redirection time (in seconds)'
          labelVariant='h3'
          variant='custom'
        />
      </FormSettings>
      <Divider />
    </SidebarFormContainer>
  );
}

export default GoodByeNodeContent;
