import { Flex } from '@chakra-ui/react';
import React from 'react';
import { FormDropdown, FormTextField } from '../FormUi';
import IconSelector from './IconSelector';
import FileSelector from './FileSelector';
import EmojiSelector from './EmojiSelector';

const buttonStyleOptions = [
  {
    value: 'text',
    label: 'Text button',
  },
  {
    label: 'Icon',
    value: 'icon',
  },
  {
    label: 'Emoji',
    value: 'emoji',
  },
  {
    label: 'Image',
    value: 'image',
  },
];

function ButtonFieldArraySettings({
  fieldItem,
  subFieldName,
  handleFieldItemPropChange,
  fieldValue,
  showExternalLinkField,
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
            buttonStyle: value || 'text',
          });
        }}
        labelVariant='h3White'
        variant='customMini'
      />
      {fieldItem?.buttonStyle === 'icon' && (
        <IconSelector
          selectedIcon={fieldValue?.icon}
          setIcon={(icon) => {
            handleFieldItemPropChange({
              icon,
            });
          }}
        />
      )}
      {fieldItem?.buttonStyle === 'image' && (
        <FileSelector
          imageSrc={fieldValue.image}
          onFileSelect={(image) => {
            handleFieldItemPropChange({
              image,
            });
          }}
        />
      )}
      {fieldItem?.buttonStyle === 'emoji' && (
        <EmojiSelector
          setEmoji={(emoji) => {
            handleFieldItemPropChange({
              emoji,
            });
          }}
        />
      )}
      {showExternalLinkField && (
        <FormTextField
          name={`${subFieldName}.externalLink`}
          label='External Link'
          placeholder='https://'
          labelVariant='h3White'
          variant='customMini'
        />
      )}
    </Flex>
  );
}

export default ButtonFieldArraySettings;
