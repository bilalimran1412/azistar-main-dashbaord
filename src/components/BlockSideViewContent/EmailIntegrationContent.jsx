import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { Box, Button, Divider, Text } from '@chakra-ui/react';
import {
  DraftEditorField,
  FormDropdown,
  FormTagInput,
  FormTextField,
  FormToggleSwitch,
} from '../Shared/FormUi';
import { fetchWrapper } from '../../utils/fetchWrapper';
import { useFetchData } from '../../hooks/bot/useFetchData';
import { useFormikContext } from 'formik';

function EmailIntegrationContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    authID: currentNode?.data?.params?.authID || '',
    fromEmail: currentNode?.data?.params?.fromEmail || '',
    emailsList: currentNode?.data?.params?.emailsList || '',
    emailSubject: currentNode?.data?.params?.emailSubject || '',
    emailMessage: currentNode?.data?.params?.emailMessage || '',
    branding: currentNode?.data?.params?.branding || false,
    email: '',
    secret: '',
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const { secret, email, ...rest } = formValues;
    updateNodeById(id, {
      params: {
        ...rest,
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
      <Box display='flex' flexDirection='column' gap={2}>
        <Text fontWeight='700' fontSize='12px'>
          WHO WILL RECEIVE THIS EMAIL?
        </Text>
        <Box>
          <Button
            backgroundColor='#fff'
            _active={{
              backgroundColor: '#fff',
            }}
            _hover={{
              backgroundColor: '#fff',
            }}
            border='1px solid #d2d2d9'
            borderRadius='3px'
          >
            🙋
            <Text fontSize='11px' fontWeight='500' textTransform='uppercase'>
              Your leads
            </Text>
          </Button>
        </Box>
        <Box padding={2.5} backgroundColor='#8a9ba826' borderRadius='3px'>
          <Text fontSize='12px' lineHeight='1.5'>
            You can send an email to your Azistar leads based on an email
            address you've previously stored in a variable.
          </Text>
        </Box>
      </Box>
      <Divider />
      <FromEmailField name='authID' />
      <Divider />
      <FormTagInput name={'emailsList'} labelVariant='h3' label='Send to' />

      <Text fontSize='12px'>
        Type in the email(s) you want to notify whenever you get a new lead.
        Press Enter to add more!
      </Text>
      <Divider />
      <DraftEditorField
        name='emailSubject'
        placeholder='Add a subject'
        label={'Email subject'}
        labelVariant='h3'
        setNodeContent={true}
      />
      <Divider />

      <DraftEditorField
        name='emailMessage'
        placeholder='Message Text'
        label={'Email Message'}
        labelVariant='h3'
      />
      <Divider />

      <FormToggleSwitch
        name='branding'
        label='Remove Azistar branding'
        labelVariant='h3'
      />
    </SidebarFormContainer>
  );
}

export default EmailIntegrationContent;

const initialOption = [{ label: 'Custom SendGrid Email', value: 'new' }];
function FromEmailField({ name }) {
  const [optionsList, setOptionsList] = React.useState(initialOption);
  const { setFieldValue } = useFormikContext();

  const {
    data: authList,
    loading,
    refetch,
  } = useFetchData('/auth/integration/sendgrid');

  React.useEffect(() => {
    if (authList?.data && !loading) {
      const options = authList?.data?.map((auth) => ({
        label: auth.auth.fromEmail,
        value: auth?._id,
      }));
      setOptionsList((pre) => [...initialOption, ...options]);
    }
  }, [authList, loading]);

  const handleOptionUpdate = async (data) => {
    await refetch();
  };
  const handleOptionChange = (value) => {
    const selectedEmail = optionsList?.find((opt) => opt.value === value);

    if (selectedEmail) {
      setFieldValue('fromEmail', selectedEmail?.label);
    }
  };
  return (
    <>
      <FormDropdown
        name={name}
        options={optionsList}
        label='From'
        labelVariant='h3'
        variant='custom'
        onChange={handleOptionChange}
      />
      <CreateEmailForm onOptionsUpdate={handleOptionUpdate} />
    </>
  );
}

function CreateEmailForm({ onOptionsUpdate }) {
  const { values, setFieldValue } = useFormikContext();
  const handleSave = async () => {
    try {
      const response = await fetchWrapper({
        url: '/auth/integration',
        method: 'POST',
        body: {
          service: 'sendgrid',
          auth: {
            fromEmail: values.email,
          },
          config: {
            secret: values.secret,
          },
        },
      });

      if (response?.data) {
        await onOptionsUpdate();
        setFieldValue('authID', response?.data?._id);
        setFieldValue('fromEmail', response?.data?.fromEmail);
        setFieldValue('email', '');
        setFieldValue('secret', '');
      }
    } catch (err) {}
  };

  return (
    <>
      {values?.authID === 'new' && (
        <Box
          backgroundColor='#8a9ba826'
          borderRadius='3px'
          fontSize='14px'
          lineHeight='1.5'
          padding={2.5}
          position='relative'
          width='100%'
          display='flex'
          flexDirection='column'
          gap={3}
        >
          <Text fontWeight='700' fontSize='12px'>
            SET UP A SENDGRID ACCOUNT
          </Text>
          <FormTextField
            label='SendGrid email'
            name='email'
            labelVariant='h3'
            placeholder='Email'
            variant='custom'
          />
          <FormTextField
            label='SendGrid API key'
            name='secret'
            labelVariant='h3'
            variant='custom'
            placeholder='pk_live_oKdO8'
          />
          <Button width='auto' colorScheme='blue' onClick={handleSave}>
            Save Email
          </Button>
        </Box>
      )}
    </>
  );
}
