import React from 'react';
import { Divider } from '@chakra-ui/react';
import { DraftEditorField } from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';

function AskNameNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);
  //TODO MOVE TO CONFIG
  // VARIABLE
  const initialValues = {
    //this message will contain all the ops and html and normal text
    message: currentNode?.data?.params?.message || {
      text: config.fields.placeholder,
    },
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,

    variable:
      currentNode?.data?.params?.variable || config.data?.params.variable,
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const variableName = formValues.variable.value;
    updateNodeById(id, { params: { ...formValues, variableName } });
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
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='variable'
      />
    </SidebarFormContainer>
  );
}

export default AskNameNodeContent;
