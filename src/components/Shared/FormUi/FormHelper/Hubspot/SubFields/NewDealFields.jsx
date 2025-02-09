import React from 'react';
import {
  AssociationFieldArray,
  DraftEditorField,
  ExtraFieldsArray,
  FormDropdown,
} from '../../../../../Shared/FormUi';
const pipelineOptions = [
  {
    value: 'sales',
    label: 'Sales pipeline',
  },
];
const dealStageOptions = [
  { label: 'Appointment Scheduled', value: 'appointment_scheduled' },
  { label: 'Qualified to Buy', value: 'qualified_to_buy' },
  { label: 'Presentation Scheduled', value: 'presentation_scheduled' },
  { label: 'Decision Maker Bought-In', value: 'decision_maker_bought_in' },
  { label: 'Contract Sent', value: 'contract_sent' },
  { label: 'Closed Won', value: 'closed_won' },
  { label: 'Closed Lost', value: 'closed_lost' },
];

function NewDealFields() {
  return (
    <>
      <DraftEditorField
        name='properties.dealName'
        placeholder='Introduce your value'
        variant='custom'
        type='inline'
        label='Deal name'
        labelVariant='h1'
      />
      <FormDropdown
        name='properties.pipeline'
        placeholder='Choose your pipeline'
        variant='custom'
        label='Pipeline'
        labelVariant='h1'
        options={pipelineOptions}
      />
      <FormDropdown
        name='properties.stage'
        placeholder='Choose your stage'
        variant='custom'
        label='Stage'
        labelVariant='h1'
        options={dealStageOptions}
      />
      <ExtraFieldsArray name='extra' />
      <AssociationFieldArray name='associations' />
    </>
  );
}

export { NewDealFields };
