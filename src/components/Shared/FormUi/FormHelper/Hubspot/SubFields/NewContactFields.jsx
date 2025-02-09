import React from 'react';
import {
  AssociationFieldArray,
  DraftEditorField,
  ExtraFieldsArray,
} from '../../../../../Shared/FormUi';

function NewContactFields() {
  return (
    <>
      <DraftEditorField
        name='properties.firstName'
        placeholder='Introduce your value'
        variant='custom'
        type='inline'
        label='First name'
        labelVariant='h1'
      />
      <DraftEditorField
        name='properties.lastName'
        placeholder='Introduce your value'
        variant='custom'
        type='inline'
        label='Last name'
        labelVariant='h1'
      />
      <DraftEditorField
        name='properties.email'
        placeholder='Introduce your value'
        variant='custom'
        type='inline'
        label='Email'
        labelVariant='h1'
      />
      <ExtraFieldsArray name='extra' />
      <AssociationFieldArray name='associations' />
    </>
  );
}

export { NewContactFields };
