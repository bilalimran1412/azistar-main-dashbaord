import React from 'react';
import { Divider } from '@chakra-ui/react';
import { DraftEditorField, FormCheckbox } from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';
import { evaluateInitialValue } from '../../utils/form';

function AskPhoneNodeContent({ id }) {
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
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,

    message: currentNode?.data?.params?.message || {
      text: config.fields.placeholder,
    },
    variable:
      currentNode?.data?.params?.variable || config?.data.params.variable,

    showCountryCodeSelector:
      currentNode?.data?.params?.showCountryCodeSelector ||
      evaluateInitialValue(config.data.params.showCountryCodeSelector),
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
      <FormCheckbox
        name='showCountryCodeSelector'
        label={'Show country code selector'}
        labelVariant='h3'
      />
      <Divider />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='variable'
      />
    </SidebarFormContainer>
  );
}

export default AskPhoneNodeContent;
