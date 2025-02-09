import {
  AssociationFieldArray,
  DraftEditorField,
  ExtraFieldsArray,
} from '../../../../../Shared/FormUi';
import React from 'react';

function NewCompanyFields() {
  return (
    <>
      <DraftEditorField
        name='properties.companyName'
        placeholder='Introduce your value'
        variant='custom'
        type='inline'
        label='Company name'
        labelVariant='h1'
      />
      <ExtraFieldsArray name='extra' />
      <AssociationFieldArray name='associations' />
    </>
  );
}

export { NewCompanyFields };
