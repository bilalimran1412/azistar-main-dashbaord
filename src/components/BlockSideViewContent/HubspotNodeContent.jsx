import React, {useState} from 'react';
import {
  HubspotSendRequest,
  SidebarFormCard,
  SidebarFormContainer,
} from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import {
  DynamicActionFields,
  FormDropdown,
  FormSettings,
  HubspotSaveResponseFieldArray,
  TriggerAutomationFieldArray,
} from '../Shared/FormUi';
import { Button, Text } from '@chakra-ui/react';
import { truncateString } from '../../utils/string';
import { filterUniqueByKey } from '../../utils/objectHelpers';
import { useFormikContext } from 'formik';
import { hubspotEvents } from '../Shared/SidebarUi/Hubspot/data';
import { useParams } from 'react-router-dom';



const account = [
  { label: 'account 1', value: '1' },
  { label: 'acct', value: '22' },
];

function HubspotNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);

  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  const initialOptions = React.useMemo(() => {
    const dataOptions = currentNode?.data?.saveResponse?.map((item) => ({
      label: truncateString(item.response),
      value: item.response,
    }));

    if (dataOptions?.length) {
      return filterUniqueByKey(dataOptions, 'value');
    } else
      return [{ label: 'Entire Response Body', value: 'Entire Response Body' }];
  }, [currentNode?.data?.saveResponse]);

  const [dropdownOptions, setDropdownOptions] = React.useState(initialOptions);
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    auth: currentNode?.data?.params?.auth || '',
    event: currentNode?.data?.params?.event || '',

    properties: currentNode?.data?.params?.properties || '',
    filter: currentNode?.data?.params?.filter || '',

    results: currentNode?.data?.params?.results || '',
    resourceType: currentNode?.data?.params?.resourceType || '',

    extra: currentNode?.data?.params?.extra || '',
    associations: currentNode?.data?.params?.associations,

    enableSave: currentNode?.data?.params?.enableSave || '',

    saveResponse: currentNode?.data?.params?.saveResponse || [
      { response: '', id: 'f0245680-a1b7-5495-bcb8-2d0fca03959a' },
    ],
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    const { enableTest, parameters, ...rest } = formValues;
    const event = hubspotEvents.find((ev) => ev.value === rest.event);
    console.log('form values >>>>', rest);
    updateNodeById(id, { params: { ...rest, nodeTextContent: event.label } });
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
      <AccountSelectionCard />
      <DynamicForm
        dropdownOptions={dropdownOptions}
        setDropdownOptions={setDropdownOptions}
      />
    </SidebarFormContainer>
  );
}

export default HubspotNodeContent;





function AccountSelectionCard() {

  const HUBSPOT_OAUTH_URL = 'https://app.hubspot.com/oauth/authorize';
const CLIENT_ID = 'your-client-id';
const { id } = useParams();
const REDIRECT_URI = `http://localhost:3000/bot/builder/${id}`; 
const SCOPES = 'contacts';

  const [authUrl, setAuthUrl] = useState(`${HUBSPOT_OAUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`);
  const [account, setAccount] = useState([]);

  const handleLogin = async () => {
    window.location.href = authUrl;
  };

  const { setFieldValue } = useFormikContext();
  const handleAuthChange = (option) => {
    setFieldValue('associations', []);
    setFieldValue('event');
    setFieldValue('extra', []);
    setFieldValue('properties', '');
    setFieldValue('filter', '');

    setFieldValue('enableSave', '');
  };

  const fetchAccountInfo = async () => {
    try {
      const response = await fetch('/api/get-hubspot-account-info', {
        method: 'GET',
        headers: {
          Authorization: `Bearer `, 
        },
      });
      const data = await response.json();
      setAccount([
        {
          value: data.email, 
          label: data.email,
        },
      ]);
    } catch (error) {
      console.error('Error fetching HubSpot account info:', error);
    }
  };

  return (
    <SidebarFormCard
      textStyles={{ display: 'flex', justifyContent: 'space-between' }}
      title='Connect your HubSpot account'
    >
      <FormDropdown
        name='auth'
        label='Account'
        options={account}
        variant='custom'
        onChange={handleAuthChange}
        labelVariant='h3'
      />
      <Button
        minH={0}
        minW={0}
        paddingX={5}
        paddingY={2}
        h='auto'
        mt={4}
        borderRadius={0}
        onClick={handleLogin}
        backgroundColor='rgb(215, 55, 107)'
        _hover={{
          backgroundColor: 'rgb(215, 55, 107)',
        }}
      >
        <Text fontSize='12px' textTransform='uppercase' color='white'>
          Add new account
        </Text>
      </Button>
    </SidebarFormCard>
  );
}

function DynamicForm({ dropdownOptions, setDropdownOptions }) {
  const { values, setFieldValue } = useFormikContext();

  if (!values?.auth) {
    return <></>;
  }
  const handleEventChange = (option) => {
    setFieldValue('associations', []);
    setFieldValue('extra', []);
    setFieldValue('properties', '');
    setFieldValue('filter', '');

    setFieldValue('enableSave', '');
  };
  return (
    <>
      <SidebarFormCard
        textStyles={{ display: 'flex', justifyContent: 'space-between' }}
        title='Choose an event'
      >
        <FormDropdown
          name='event'
          label=''
          options={hubspotEvents}
          variant='custom'
          labelVariant='h3'
          onChange={handleEventChange}
        />
      </SidebarFormCard>
      {values?.event && (
        <>
          <SidebarFormCard
            textStyles={{ display: 'flex', justifyContent: 'space-between' }}
            title='Define the operation'
            contentContainerProps={{
              sx: {
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              },
            }}
          >
            <DynamicActionFields />
          </SidebarFormCard>
          <FormSettings
            label={'Test your request'}
            name='enableTest'
            labelProps={{
              style: {
                fontSize: '1rem',
                letterSpacing: '0',
                lineHeight: '24px',
                color: 'rgb(51, 64, 94)',
                fontWeight: '700',
                flex: 1,
                cursor: 'default',
              },
              as: 'span',
            }}
            containerStyles={{
              padding: '20px',
              backgroundColor: '#fff',
              boxShadow: '0 0 0 1px #10161a26, 0 0 #10161a00, 0 0 #10161a00',
              borderRadius: '3px',
            }}
          >
            <Text fontSize='14px' fontWeight='700'>
              Manually set values for test variables
            </Text>
            <Text>
              If your request contains variables, you can manually set their
              values for testing purpose.
            </Text>
            <TriggerAutomationFieldArray name='parameters' />
            <HubspotSendRequest setDropdownOptions={setDropdownOptions} />
          </FormSettings>
          <FormSettings
            label={'Save Responses as Variables'}
            name='enableSave'
            labelProps={{
              style: {
                fontSize: '1rem',
                letterSpacing: '0',
                lineHeight: '24px',
                color: 'rgb(51, 64, 94)',
                fontWeight: '700',
                flex: 1,
                cursor: 'default',
              },
              as: 'span',
            }}
            containerStyles={{
              padding: '20px',
              backgroundColor: '#fff',
              boxShadow: '0 0 0 1px #10161a26, 0 0 #10161a00, 0 0 #10161a00',

              borderRadius: '3px',
            }}
          >
            <HubspotSaveResponseFieldArray
              name='saveResponse'
              dropdownOptions={dropdownOptions}
            />
          </FormSettings>
        </>
      )}
    </>
  );
}
