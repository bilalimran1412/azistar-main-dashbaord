import React from 'react';
import { Box, Divider } from '@chakra-ui/react';
import {
  DraftEditorField,
  FormCustomOptionSelector,
  FormSettings,
  FormTextField,
} from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';

const selectionOptions = [
  { label: 'Short', value: 'short' },
  { label: 'Long', value: 'long' },
];
function AskQuestionNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;

  const initialValues = {
    //this message will contain all the ops and html and normal text
    message: currentNode?.data?.params?.message || {
      text: config.fields.placeholder,
    },
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,
    variable:
      currentNode?.data?.params?.variable || config.data.params.variable,
    settings: currentNode?.data?.params?.settings || '',
    sizeOfTextArea:
      currentNode?.data?.params?.sizeOfTextArea ||
      config.data.params.sizeOfTextArea,
    min: currentNode?.data?.params?.min || config.data.params.min,
    max: currentNode?.data?.params?.max || config.data.params.max,
    regex: currentNode?.data?.params?.regex || '',
    errorMessage:
      currentNode?.data?.params?.errorMessage ||
      config.data.params.errorMessage,
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
      <FormSettings
        name='settings'
        label='Settings'
        containerStyles={{ borderRadius: '3px', background: '#8a9ba826' }}
        labelVariant='h2'
        labelProps={{ style: { cursor: 'pointer' } }}
      >
        <FormCustomOptionSelector
          name='sizeOfTextArea'
          label='Size of text area'
          options={selectionOptions}
          labelVariant='h3'
        />
        <Box display='flex' justifyContent='space-between' gap='1rem' mt={4}>
          <FormTextField
            name='min'
            label='Min. Characters'
            className='input'
            labelVariant='h3'
            variant='custom'
          />
          <FormTextField
            name='max'
            label='Max. Characters'
            className='input'
            labelVariant='h3'
            variant='custom'
          />
        </Box>
        <FormTextField
          name='regex'
          label='Regex Pattern'
          className='input'
          labelVariant='h3'
          variant='custom'
        />
        <FormTextField
          name='errorMessage'
          type='textarea'
          label='Validation Error Message'
          labelVariant='h3'
        />
      </FormSettings>
      <Divider />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='variable'
      />
    </SidebarFormContainer>
  );
}

export default AskQuestionNodeContent;
