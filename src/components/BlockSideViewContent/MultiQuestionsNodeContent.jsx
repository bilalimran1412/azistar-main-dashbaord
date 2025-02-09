import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { Divider } from '@chakra-ui/react';
import {
  DraftEditorField,
  FormSettings,
  FormTextField,
  SortableMultiQuestionFieldArray,
} from '../Shared/FormUi';

function MultiQuestionsNodeContent({ id }) {
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
    message: currentNode?.data?.params?.message || {
      text: config.fields.placeholder,
    },
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,

    sendLabel:
      currentNode?.data?.params?.sendLabel ||
      config?.data?.params?.sendLabel ||
      '',
    isAdvancedEnabled:
      currentNode?.data?.params?.isAdvancedEnabled ||
      config?.data?.params?.isAdvancedEnabled ||
      '',
    elements: currentNode?.data?.params?.elements || '',
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
      <DraftEditorField
        name='message'
        placeholder={config.fields.placeholder}
        label={config.fields.label}
        labelVariant='h1'
        setNodeContent={true}
      />
      <Divider />
      <SortableMultiQuestionFieldArray name='elements' />
      <Divider />
      <FormSettings
        name='isAdvancedEnabled'
        label='Advanced Options'
        bgColor='inherit'
        containerStyles={{ padding: 0 }}
        labelVariant='h3'
        labelProps={{ style: { cursor: 'pointer' } }}
      >
        <FormTextField
          name='sendLabel'
          variant='custom'
          label='Customize submit button label'
          labelVariant='h2'
        />
      </FormSettings>
    </SidebarFormContainer>
  );
}

export default MultiQuestionsNodeContent;
