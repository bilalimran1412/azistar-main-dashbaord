import React from 'react';
import { useField } from 'formik';

import VariableInputField from '../SidebarUi/VariableInputField';

export default function FormVariableSelectorDropdown({
  name,
  allowedType = 'all',
  label = 'Save answers in the variable',
  readOnly = true,
  labelVariant,
  placeholder = '',
}) {
  const [field, , helpers] = useField(name);

  return (
    <VariableInputField
      popupType='input'
      placeholder={placeholder}
      labelVariant={labelVariant}
      initialValue={field.value}
      label={label}
      allowedType={allowedType}
      onSelect={(option) => {
        helpers.setValue(option);
      }}
    />
  );
}
