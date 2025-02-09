import React from 'react';
import { Divider } from '@chakra-ui/react';
import { DraftEditorField, FormTextField } from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';
import { seedID } from '../../utils';

function OpinionScaleNodeContent({ id }) {
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

    from: currentNode?.data?.params?.from || config.data?.params?.from,
    leftLabel:
      currentNode?.data?.params?.leftLabel || config.data?.params?.leftLabel,
    to: currentNode?.data?.params?.to || config.data?.params?.to,
    rightLabel:
      currentNode?.data?.params?.rightLabel || config.data?.params?.rightLabel,
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const variableName = formValues.variable.value;
    const { leftLabel, rightLabel, from, to } = formValues;

    const buttons = [];
    console.log(+from < +to);
    buttons.push({ id: seedID(), text: `${from} - ${leftLabel}` });
    if (+from < +to) {
      for (let i = +from + 1; i < +to; i++) {
        buttons.push({ id: seedID(), text: String(i) });
      }
    } else {
      for (let i = +from - 1; i > +to; i--) {
        buttons.push({ id: seedID(), text: String(i) });
      }
    }
    buttons.push({ id: seedID(), text: `${+to} - ${rightLabel}` });
    updateNodeById(id, { params: { ...formValues, variableName, buttons } });
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

      <Divider />
      <FormTextField
        name='from'
        label='From'
        placeholder={0}
        labelVariant='h3'
        variant='custom'
      />
      <FormTextField
        name='leftLabel'
        label='Left Label'
        placeholder={'Worst'}
        labelVariant='h3'
        variant='custom'
      />
      <FormTextField
        name='to'
        label='To'
        placeholder={0}
        labelVariant='h3'
        variant='custom'
      />
      <FormTextField
        name='rightLabel'
        label='Right Label'
        placeholder={'Best'}
        labelVariant='h3'
        variant='custom'
      />

      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='variable'
      />
    </SidebarFormContainer>
  );
}

export default OpinionScaleNodeContent;
