import { Flex } from '@chakra-ui/react';
import { FormDropdown, FormTextField } from '../../FormUi';
import React from 'react';

const buttonStyleOptions = [
  {
    value: 'jump',
    label: 'Keyboard Jump',
  },
  {
    label: 'External Link',
    value: 'link',
  },
];
const buttonTypeOptions = [
  {
    value: 'text',
    label: 'Text',
  },
  {
    label: 'Button',
    value: 'button',
  },
];

function PersistentMenuSettings({
  subFieldName,
  handleFieldItemPropChange,
  fieldValue,
}) {
  return (
    <Flex
      bg={'#8a9ba826'}
      borderRadius={'3px'}
      flex={1}
      padding='10px 12px 9px'
      direction='column'
      gap={5}
    >
      <FormDropdown
        name={`${subFieldName}.buttonStyle`}
        label='Button Style'
        options={buttonStyleOptions}
        onChange={(value) => {
          handleFieldItemPropChange({
            buttonStyle: value,
          });
        }}
        labelVariant='h3White'
        variant='customMini'
      />
      {fieldValue?.buttonStyle === 'link' && (
        <FormTextField
          name={`${subFieldName}.externalLink`}
          label='External Link'
          variant='customMini'
          placeholder='https://'
          labelVariant='h3White'
        />
      )}

      <FormDropdown
        name={`${subFieldName}.buttonType`}
        label=''
        labelVariant='h3White'
        variant='customMini'
        options={buttonTypeOptions}
        onChange={(value) => {
          handleFieldItemPropChange({
            buttonType: value,
          });
        }}
      />
    </Flex>
  );
}

export { PersistentMenuSettings };
