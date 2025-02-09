import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import {
  ButtonCreatorInputFieldArray,
  DraftEditorField,
} from '../Shared/FormUi';
import { Divider } from '@chakra-ui/react';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';

function YesNoNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];

  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    message: currentNode?.data?.params?.message || {
      text: config.fields.placeholder,
    },
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,

    variable:
      currentNode?.data?.params?.variable || config.data?.params?.variable,
    buttons: currentNode?.data?.params?.buttons || config.data?.param?.buttons,
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const variableName = formValues.variable.value;

    updateNodeById(id, {
      params: { ...formValues, variableName },
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
        setNodeContent={true}
        labelVariant='h1'
      />
      <ButtonCreatorInputFieldArray
        name='buttons'
        label='Buttons'
        showExternalLinkField={false}
      />

      <Divider />
      <FormVariableSelectorDropdown
        name='variable'
        readOnly
        allowedType={config?.variableType}
      />
    </SidebarFormContainer>
  );
}

export default YesNoNodeContent;
