import React from 'react';
import { Box, Divider } from '@chakra-ui/react';
import {
  DraftEditorField,
  FormDropdown,
  FormSettings,
  FormTextField,
} from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';
import { evaluateInitialValue } from '../../utils/form';

const formatOptions = [
  { label: 'Auto', value: 'auto' },
  { label: 'Decimals', value: 'decimals' },
  { label: 'Whole Numbers', value: 'wholeNumbers' },
];
function AskNumberNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;

  const initialValues = {
    message: currentNode?.data?.params?.message || {
      text: config.fields.placeholder,
    },
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,

    variable:
      currentNode?.data?.params?.variable || config.data?.params?.variable,
    settings:
      currentNode?.data?.params?.settings ||
      evaluateInitialValue(config.data?.params?.settings),
    format: currentNode?.data?.params?.format || config.data?.params?.format,
    min: currentNode?.data?.params?.min || config.data?.params?.min,
    max: currentNode?.data?.params?.max || config.data?.params?.max,
    prefix: currentNode?.data?.params?.prefix || '',
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
      <FormSettings
        name='settings'
        label='Settings'
        containerStyles={{ borderRadius: '3px', background: '#8a9ba826' }}
        labelVariant='h2'
        labelProps={{ style: { cursor: 'pointer' } }}
      >
        <Box display='flex' justifyContent='space-between' gap='1rem'>
          <FormDropdown
            name='format'
            label='Format'
            options={formatOptions}
            labelVariant='h3'
            variant='custom'
          />
          <FormTextField
            name='prefix'
            label='Prefix'
            placeholder='Examples: $, %/'
            labelVariant='h3'
            variant='custom'
          />
        </Box>
        <Box display='flex' justifyContent='space-between' gap='1rem'>
          <FormTextField
            name='min'
            label='Min. Value'
            labelVariant='h3'
            variant='custom'
          />
          <FormTextField
            name='max'
            label='Max. Value'
            labelVariant='h3'
            variant='custom'
          />
        </Box>
      </FormSettings>
      <Divider />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='variable'
      />
    </SidebarFormContainer>
  );
}

export default AskNumberNodeContent;
