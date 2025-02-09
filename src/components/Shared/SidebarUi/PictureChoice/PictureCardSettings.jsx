import { Flex } from '@chakra-ui/react';
import React from 'react';
import { FormTextField } from '../../FormUi';
import FileSelector from '../FileSelector';
import { ExtraOptionsAccordion } from '../../UiComponents';

function PictureCardSettings({
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
      <FormTextField
        name={`${subFieldName}.text`}
        label='Title'
        placeholder='Choice title'
        labelVariant='h3White'
        variant='customMini'
      />
      <FileSelector
        sectionLabel=''
        imageSrc={fieldValue.image}
        onFileSelect={(image) => {
          handleFieldItemPropChange({
            image,
          });
        }}
        editImage={true}
      />
      <FormTextField
        name={`${subFieldName}.externalLink`}
        label='External Link'
        placeholder='https://'
        labelVariant='h3White'
        variant='customMini'
      />
      <ExtraOptionsAccordion>
        <FormTextField
          name={`${subFieldName}.description`}
          label='Description'
          labelVariant='h3White'
          variant='customMini'
        />
        <FormTextField
          name={`${subFieldName}.details`}
          label='Details'
          labelVariant='h3White'
          variant='customMini'
        />
        <Flex gap={1}>
          <FormTextField
            name={`${subFieldName}.highlighted`}
            label='Highlighted'
            labelVariant='h3White'
            variant='customMini'
          />
          <FormTextField
            name={`${subFieldName}.buttonText`}
            label='Button Text'
            labelVariant='h3White'
            variant='customMini'
          />
        </Flex>
        <FileSelector
          sectionLabel='Image with footer'
          imageSrc={fieldValue.footerImage}
          onFileSelect={(footerImage) => {
            handleFieldItemPropChange({
              footerImage,
            });
          }}
          editImage={true}
        />
      </ExtraOptionsAccordion>
    </Flex>
  );
}

export { PictureCardSettings };
