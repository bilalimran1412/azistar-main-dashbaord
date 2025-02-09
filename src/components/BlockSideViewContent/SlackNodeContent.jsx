import React from 'react';
import { Box, Button, Divider, FormLabel, Text } from '@chakra-ui/react';
import { DraftEditorField, FormDropdown } from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { FaSlack } from 'react-icons/fa';
const options = [
  { label: 'Alpha Bridge #common', value: '323' },
  { label: 'Private Space #personal', value: '339' },
];
function SlackNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);
  const initialValues = {
    //this message will contain all the ops and html and normal text
    text: currentNode?.data?.params?.text || '',
    slack: currentNode?.data?.params?.slack || '',
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
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
      <Box>
        <FormLabel fontSize='13px' fontWeight='500'>
          Connect your Slack account
        </FormLabel>
        <Button
          leftIcon={<FaSlack />}
          backgroundColor='white'
          color='black'
          border='1px solid #d3d3d3'
          _hover={{
            backgroundColor: '#fff',
          }}
        >
          <Text fontWeight='500'>Add to &nbsp;</Text>
          <Text> Slack</Text>
        </Button>
      </Box>
      <Divider />
      <FormDropdown
        name='slack'
        options={options}
        label=''
        labelVariant='h3'
        variant='custom'
      />
      <DraftEditorField
        placeholder='Example New lead on board @name'
        name='text'
        label='Slack Message'
        labelVariant='h3'
        setNodeContent={true}
      />
    </SidebarFormContainer>
  );
}

export default SlackNodeContent;
