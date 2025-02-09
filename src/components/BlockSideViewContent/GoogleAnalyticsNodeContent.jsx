import React from 'react';
import {
  GoogleAnalyticsConfigForm,
  SidebarFormContainer,
} from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { Button, Divider, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { FormSettings, FormTextField } from '../Shared/FormUi';

function GoogleAnalyticsNodeContent({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);
  const initialValues = {
    category: currentNode?.data?.params?.category || '',
    advancedConfig: currentNode?.data?.params?.advancedConfig || '',
    action: currentNode?.data?.params?.action || '',
    label: currentNode?.data?.params?.label || '',
    value: currentNode?.data?.params?.value ?? 0,
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    updateNodeById(id, { params: { ...formValues } });
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
        <Flex paddingY={1} justifyContent='space-between' align='center'>
          <Text fontWeight='700'>Google Analytics tracking ID</Text>
          <Button colorScheme='teal' onClick={onOpen}>
            Add
          </Button>
        </Flex>
        <Divider />
        <FormTextField
          name='category'
          label='Event Category'
          placeholder='Example: <<Videos>>'
          labelVariant='h3'
          variant='custom'
        />
        <FormTextField
          name='action'
          label='Event Action'
          placeholder='Example: <<Play Video>>'
          labelVariant='h3'
          variant='custom'
        />
        <Divider />
        <FormSettings
          name='advancedConfig'
          label='Advanced options'
          labelVariant='h3'
          containerStyles={{
            padding: '0',
          }}
          bgColor='transparent'
        >
          <FormTextField
            name='label'
            label='Event Label'
            placeholder='Example: <<Full Campaign>>'
            labelVariant='h3'
            variant='custom'
          />
          <FormTextField
            name='value'
            label='Event Value'
            placeholder='Example: <<10>>'
            labelVariant='h3'
            variant='custom'
          />
        </FormSettings>
        <Divider />
      </SidebarFormContainer>
      <GoogleAnalyticsConfigForm isOpen={isOpen} onClose={onClose} id={id} />
    </>
  );
}

export default GoogleAnalyticsNodeContent;
