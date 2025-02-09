import React from 'react';
import {
  AssociationFieldArray,
  DraftEditorField,
  ExtraFieldsArray,
  FormDropdown,
} from '../../../../FormUi';
const ticketStageOptions = [
  { label: 'New', value: 'new' },
  { label: 'Waiting on contact', value: 'waiting_on_contact' },
  { label: 'Waiting on us', value: 'waiting_on_us' },
  { label: 'Closed', value: 'closed' },
];
const pipelineOptions = [
  {
    value: 'sales',
    label: 'Sales pipeline',
  },
];
function NewTicketFields() {
  return (
    <>
      <DraftEditorField
        name='properties.ticketName'
        placeholder='Introduce your value'
        variant='custom'
        type='inline'
        label='Ticket name'
        labelVariant='h1'
      />
      <FormDropdown
        name='properties.pipeline'
        placeholder='Choose your pipeline'
        variant='custom'
        label='Pipeline'
        options={pipelineOptions}
        labelVariant='h1'
      />
      <FormDropdown
        name='properties.stage'
        placeholder='Choose your stage'
        variant='custom'
        label='Stage'
        labelVariant='h1'
        options={ticketStageOptions}
      />
      <ExtraFieldsArray name='extra' />
      <AssociationFieldArray name='associations' />
    </>
  );
}

export { NewTicketFields };
