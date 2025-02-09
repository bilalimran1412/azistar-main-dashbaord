import React from 'react';
import { Box, Divider, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { FormCheckbox } from '../Shared/FormUi';

const user = 'Azistar User';
function HumanTakeoverNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    assignedAgent: currentNode?.data?.params?.assignedAgent || '',
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
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
      <Box className='content' p={4} maxW='lg' mx='auto'>
        <Text fontWeight='bold' mb={4}>
          You can assign the conversation to the agents you want, by selecting
          them on the list below.
        </Text>
        <Divider mb={4} />
        <Text fontWeight='bold' mb={2}>
          What happens if:
        </Text>
        <UnorderedList spacing={2}>
          <ListItem>
            <Text as='span' fontWeight='bold'>
              There is no selection:{' '}
            </Text>
            it will assign the conversation to one of all the available agents
            (Prioritizing those agents who have less conversations).
          </ListItem>
          <ListItem>
            <Text as='span' fontWeight='bold'>
              There is no agent online:{' '}
            </Text>
            the conversation will follow the chatbot flow.
          </ListItem>
        </UnorderedList>
      </Box>
      <Box
        bg='#8a9ba826'
        padding={2.5}
        display='flex'
        flexDirection='column'
        gap={2}
        borderRadius='3px'
      >
        <Text fontSize='13px'>Select the agents to assign</Text>
        <FormCheckbox name='assignedAgent' label={user} labelVariant='h3' />
      </Box>
    </SidebarFormContainer>
  );
}

export default HumanTakeoverNodeContent;
