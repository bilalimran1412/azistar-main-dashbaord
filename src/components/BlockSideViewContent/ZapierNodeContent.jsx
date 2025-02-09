import React from 'react';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { FormTextField } from '../Shared/FormUi';
import { useFormikContext } from 'formik';

function ZapierNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;

  const initialValues = {
    token: '5HOjrgUyegoicdI6VlbFEb1wglw2A6MFalHHBy',
    bot: 'Test Bot name',
    block: id || '',
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    updateNodeById(id, { params: { ...formValues } });
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
      <Flex alignItems='center' gap={2}>
        <FormTextField
          name='token'
          labelVariant='h3'
          variant='custom'
          readonly={true}
          label='Your Azistar Token'
        />
        <CopyContent />
      </Flex>
      <Flex gap={3}>
        <FormTextField
          name='bot'
          labelVariant='h3'
          variant='custom'
          readonly={true}
          label='Bot Name / ID'
        />
        <Flex>
          <FormTextField
            name='block'
            labelVariant='h3'
            variant='custom'
            readonly={true}
            label='Block ID'
          />
        </Flex>
      </Flex>
      <Divider />
    </SidebarFormContainer>
  );
}

export default ZapierNodeContent;

function CopyContent() {
  const { values } = useFormikContext();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(values?.token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Button
      marginTop={5}
      minH={0}
      minW={0}
      h='28px'
      paddingX={4}
      borderRadius={0}
      backgroundColor='rgb(215, 55, 107)'
      _hover={{
        backgroundColor: 'rgb(215, 55, 107)',
      }}
      onClick={handleCopy}
    >
      <Text fontSize='12px' textTransform='uppercase' color='white'>
        {copied ? 'Copied!' : 'Copy'}
      </Text>
    </Button>
  );
}
