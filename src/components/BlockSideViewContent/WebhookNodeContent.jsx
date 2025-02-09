import React from 'react';
import {
  SendRequest,
  SidebarFormCard,
  SidebarFormContainer,
  WebhookDomainModal,
  WebhookSelection,
} from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import {
  Box,
  Button,
  Flex,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import {
  CodeEditorField,
  FormDropdown,
  FormSettings,
  FormTextField,
  ParamsFieldArray,
  SaveResponseFieldArray,
  SortableRoutingFieldArray,
  TriggerAutomationFieldArray,
} from '../Shared/FormUi';
import VariableInputField from '../Shared/SidebarUi/VariableInputField';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { filterUniqueByKey, getFinalUrl } from '../../utils/objectHelpers';
import { truncateString } from '../../utils/string';
import { useUpdateNodeInternals } from '@xyflow/react';

const httpMethods = [
  { value: 'GET', label: 'GET' },
  { value: 'POST', label: 'POST' },
  { value: 'PUT', label: 'PUT' },
  { value: 'DELETE', label: 'DELETE' },
  { value: 'PATCH', label: 'PATCH' },
  { value: 'HEAD', label: 'HEAD' },
  { value: 'OPTIONS', label: 'OPTIONS' },
  { value: 'CONNECT', label: 'CONNECT' },
  { value: 'TRACE', label: 'TRACE' },
];

function WebhookNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById, setEdges } =
    useNodeContext();
  const currentNode = getNodeById(id);
  const { onClose, isOpen, onOpen } = useDisclosure();
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
  const updateNodeInternals = useUpdateNodeInternals();
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);
  //TODO MOVE TO CONFIG
  const initialValues = {
    url: currentNode?.data?.params?.url || '',

    customFields: currentNode?.data?.params?.customFields || '',
    customHeaders: currentNode?.data?.params?.customHeaders || '',
    enableParams: currentNode?.data?.params?.enableParams || '',
    customBody: currentNode?.data?.params?.customBody || '',
    saveResponse: currentNode?.data?.params?.saveResponse || [
      { response: '', id: 'f0245680-a1b7-5495-bcb8-2d0fca03959a' },
    ],
    enableRouting: currentNode?.data?.params?.enableRouting || false,
    body: currentNode?.data?.params?.body || '',
    enableSave: currentNode?.data?.params?.enableSave || '',
    routes: currentNode?.data?.params?.routes || [
      {
        id: 'd8e44211-ab57-4e79-aa32-1518e4bba3e4',
        text: '200',
        sortOrder: 1,
      },
      {
        id: 'f71ec1f8-3677-4c1a-b420-f7fc44ca090b',
        text: '400',
        sortOrder: 2,
      },
      {
        id: 'f58defbd-9916-4712-b661-7ca335f78be9',
        text: '500',
        sortOrder: 3,
      },
    ],
    parameters: currentNode?.data?.params?.parameters || [{ testValue: '' }],
    method: currentNode?.data?.params?.method || 'POST',
    params: currentNode?.data?.params?.params || [
      { key: '', value: '', id: 'bb1a3e97-9735-5c82-90f4-bc5d29520580' },
    ],
    headers: currentNode?.data?.params?.params || [
      { key: '', value: '', id: '36f471b9-753a-57e5-9e70-57534ceaa207' },
    ],
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const nodeTextContent = formValues.url;
    const isChanged =
      Boolean(formValues?.enableRouting) !==
      Boolean(currentNode?.data?.params?.enableRouting);
    if (isChanged) {
      setEdges((edges) => edges?.filter((edge) => edge.source !== id));
      updateNodeInternals(id);
    }
    const previousHandles = currentNode?.data?.params?.buttons;
    const newHandles = formValues?.routes;

    const removedHandles = previousHandles?.filter(
      (prevItem) => !newHandles.some((newItem) => newItem.id === prevItem.id)
    );
    removedHandles?.forEach((removedHandle) => {
      const id = removedHandle.id;
      setEdges((edges) =>
        edges?.filter((edge) => !edge?.sourceHandle?.includes(id))
      );
    });
    if (formValues?.enableRouting) {
      updateNodeById(id, {
        ...currentNode?.data,
        contentType: 'buttonNode',
        enableDynamicNode: true,
        params: {
          ...formValues,
          buttons: formValues.routes,
          ...(nodeTextContent && { nodeTextContent }),
        },
      });
    } else {
      updateNodeById(id, {
        ...currentNode?.data,
        contentType: '',
        enableDynamicNode: false,
        params: {
          ...formValues,
          ...(nodeTextContent && { nodeTextContent }),
        },
      });
    }

    handleClose();
  };

  return (
    <>
      <SidebarFormContainer
        block={config}
        onClose={handleClose}
        onFormSave={onSave}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onReset={handleClose}
      >
        <SidebarFormCard
          textStyles={{ display: 'flex', justifyContent: 'space-between' }}
          title={
            <>
              URL & Method
              <Button
                onClick={onOpen}
                variant='outline'
                backgroundColor={'#fff'}
                borderRadius='3px'
                fontSize='14px'
                maxH='30px'
                px='10px'
                textAlign='left'
                verticalAlign='middle'
              >
                Set domain variables
              </Button>
            </>
          }
          contentContainerProps={{
            style: { display: 'flex' },
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <Flex>
            <FormDropdown
              name='method'
              label='Method'
              options={httpMethods}
              variant='custom'
              labelVariant='h3'
              containerStyle={{ width: '40%' }}
            />
            <FormTextField
              name='url'
              label='URL'
              variant='custom'
              labelVariant='h3'
              placeholder='https://'
            />
          </Flex>
          <InputPreview />
        </SidebarFormCard>
        <FormSettings
          label={'Send Params'}
          name='enableParams'
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
          infoText='Attach parameters to the end of request URL (example: ?email=elon@tesla.com)'
        >
          <ParamsFieldArray name='params' />
        </FormSettings>
        <FormSettings
          label={'Customize Headers'}
          name='customHeaders'
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
          infoText='Add headers to your request (example: Content-Type: application/json)'
        >
          <Text fontWeight='700'>Custom header</Text>
          <ParamsFieldArray name='headers' />
        </FormSettings>
        <FormSettings
          label={'Custom Body'}
          name='customBody'
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
          <FormattingTipsBox />
          <CodeEditorField name='body' label='Request Body (JSON only)' />
        </FormSettings>
        <SidebarFormCard
          title='Test Your Request'
          contentContainerProps={{
            style: { display: 'flex' },
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <FormSettings
            label={'Manually set test values for variables'}
            name='customFields'
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
              padding: '0',
              backgroundColor: '#fff',
            }}
            infoText='If your request contains variables, you can manually set their values
          for testing purpose.'
          >
            <TriggerAutomationFieldArray name='parameters' />
          </FormSettings>
          <SendRequest type='webhook' setDropdownOptions={setDropdownOptions} />
        </SidebarFormCard>
        <FormSettings
          label={'💾  Save Responses as Variables'}
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
          <SaveResponseFieldArray
            name='saveResponse'
            dropdownOptions={dropdownOptions}
          />
        </FormSettings>
        <FormSettings
          label={'Response Routing'}
          name='enableRouting'
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
          infoText='Split your flow based on response status codes (200, 400, 500, etc).'
        >
          <SortableRoutingFieldArray name='routes' />
        </FormSettings>
      </SidebarFormContainer>
      {isOpen && (
        <WebhookDomainModal onClose={onClose} id={id} isOpen={isOpen} />
      )}
    </>
  );
}

export default WebhookNodeContent;

const InputPreview = () => {
  const { values, setFieldValue } = useFormikContext();
  const onVariableSelect = (option) => {
    setFieldValue('url', `${values?.url}\${{${option.value}}}`);
  };

  const finalUrl = React.useMemo(() => {
    return getFinalUrl(values);
  }, [values]);

  const onDomainSelect = (domain) => {
    if (!domain) return;
    setFieldValue('url', `${domain.domain}`);
  };

  return (
    <Flex direction='column' gap={2}>
      {values?.url && (
        <Box bg='#646de117' p={4} borderRadius='3px' width='100%'>
          <Text fontSize='9px' opacity={0.7}>
            PREVIEW URL
          </Text>

          <Text fontSize='12px' opacity={0.7} mt={2}>
            {finalUrl}
          </Text>
        </Box>
      )}
      <Flex gap={2}>
        <VariableInputField popupType='button' onSelect={onVariableSelect} />
        <WebhookSelection onSelect={onDomainSelect} />
      </Flex>
    </Flex>
  );
};

const FormattingTipsBox = () => {
  return (
    <Box
      borderWidth='1px'
      borderRadius='lg'
      p={4}
      bg='blue.50'
      borderColor='blue.200'
      mb={4}
      fontSize='12px'
    >
      <Stack direction='row' alignItems='center' mb={3}>
        <InfoOutlineIcon color='blue.500' />
        <Text fontWeight='bold' color='blue.800' fontSize='md'>
          Formatting Tips
        </Text>
      </Stack>
      <Text color='blue.700' fontSize='sm' mb={2}>
        Follow these rules when entering your data:
      </Text>
      <List spacing={2} pl={4}>
        <ListItem>
          <ListIcon as={InfoOutlineIcon} color='blue.400' />
          <Text as='span' fontWeight='medium' color='blue.800'>
            Strings and Variables:
          </Text>{' '}
          Must be wrapped in quotes →{' '}
          <Text as='span' color='gray.700'>
            "@name"
          </Text>
        </ListItem>
        <ListItem>
          <ListIcon as={InfoOutlineIcon} color='blue.400' />
          <Text as='span' fontWeight='medium' color='blue.800'>
            Key-Value Pairs:
          </Text>{' '}
          A comma is needed between two key-value pairs →{' '}
          <Text as='span' color='gray.700'>
            "Email: @email", "Name": "@name"
          </Text>
        </ListItem>
      </List>
    </Box>
  );
};
