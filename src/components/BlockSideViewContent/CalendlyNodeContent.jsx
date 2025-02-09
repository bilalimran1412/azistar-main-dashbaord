import React from 'react';
import { SidebarFormCard, SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';
import {
  DraftEditorField,
  FormCheckbox,
  FormDropdown,
  FormSettings,
  FormTextField,
  SortableInviteQuestionsFieldArray,
} from '../Shared/FormUi';
import { Button, Divider, Text } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

const accountOptions = [
  { label: 'Azistar User', value: 1 },
  { label: 'Azistar User2', value: '3' },
];
const durationOptions = [{ label: '30 Minute meeting', value: 2 }];

function CalendlyNodeContent({ id }) {
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
    duration: currentNode?.data?.params?.duration || '',
    text: currentNode?.data?.params?.text || '',
    enableAllEvent: currentNode?.data?.params?.enableAllEvent || '',
    account: currentNode?.data?.params?.account || '',
    buttonText: currentNode?.data?.params?.buttonText || '',
    skipText: currentNode?.data?.params?.skipText || '',
    eventType: currentNode?.data?.params?.eventType || '',
    startTime: currentNode?.data?.params?.startTime || '',
    endTime: currentNode?.data?.params?.endTime || '',
    email: currentNode?.data?.params?.email || '',
    name: currentNode?.data?.params?.name || '',
    openVariables: currentNode?.data?.params?.openVariables || '',
    extraQuestion: currentNode?.data?.params?.extraQuestion || '',
    buttons: config?.data.params?.buttons,
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
      <SidebarFormCard
        title='Connect your Calendly account'
        contentContainerProps={{
          style: { display: 'flex', flexDirection: 'column', gap: '12px' },
        }}
      >
        <FormDropdown
          name='account'
          options={accountOptions}
          label=''
          labelVariant='h3'
          variant='custom'
        />
        <Button
          variant='outline'
          backgroundColor={'#fff'}
          alignItems='center'
          borderRadius='3px'
          cursor='pointer'
          display='inline-flex'
          flexDirection='row'
          fontSize='14px'
          justifyContent='center'
          maxH='30px'
          maxW='50%'
          px='10px'
          py='5px'
          textAlign='left'
          verticalAlign='middle'
        >
          Add a new account
        </Button>
        <DurationSelection />
        <FormCheckbox
          name='enableAllEvent'
          label='Show all events'
          labelVariant='h3'
        />
      </SidebarFormCard>

      <SidebarFormCard
        title='Customize the invite'
        contentContainerProps={{
          style: { display: 'flex', flexDirection: 'column', gap: '12px' },
        }}
      >
        <Text fontSize='11px'>
          Personalize the message and the button you want to show to your end
          users inside the botflow.
        </Text>
        <DraftEditorField
          name='text'
          label='Invite message'
          labelVariant='h3'
          placeholder='Hi, I am open to speaking with you, Please find a slot in my calender to chat'
        />
        <FormTextField
          name='buttonText'
          label='Button Text'
          labelVariant='h3'
          variant='custom'
        />
        <FormTextField
          name='skipText'
          label='Skip Text'
          labelVariant='h3'
          variant='custom'
        />
      </SidebarFormCard>
      <FormSettings
        label={'User’s data variables'}
        name='openVariables'
        labelProps={{
          style: {
            fontSize: '1rem',
            letterSpacing: '0',
            lineHeight: '24px',
            color: 'rgb(51, 64, 94)',
            fontWeight: '700',
            flex: 1,
            cursor: 'default',
          },
          as: 'span',
        }}
        containerStyles={{
          padding: '20px',
          backgroundColor: '#fff',
          boxShadow: '0 0 0 1px #10161a26, 0 0 #10161a00, 0 0 #10161a00',

          borderRadius: '3px',
        }}
        infoText='Use here the variables where you saved the user data that will populate the Calendly form (to avoid user from retyping it if you previously asked for it).'
      >
        <FormVariableSelectorDropdown
          allowedType={config?.variableType}
          name='email'
          label='Email'
        />
        <FormVariableSelectorDropdown
          allowedType={config?.variableType}
          name='name'
          label='Name'
        />
        <SortableInviteQuestionsFieldArray />
      </FormSettings>
      <Divider />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='eventType'
        label='Save event type in the field'
      />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='startTime'
        label='Save start time in the field'
      />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='endTime'
        label='Save end time in the field'
      />
    </SidebarFormContainer>
  );
}

export default CalendlyNodeContent;

const DurationSelection = () => {
  const { values } = useFormikContext();

  return (
    <FormDropdown
      name='duration'
      options={durationOptions}
      label=''
      labelVariant='h3'
      variant='custom'
      disabled={values?.enableAllEvent}
    />
  );
};
