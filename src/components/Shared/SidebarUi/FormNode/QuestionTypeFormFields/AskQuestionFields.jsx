import { Divider, Flex } from '@chakra-ui/react';
import {
  FormCustomOptionSelector,
  FormTextField,
} from '../../../FormUi';
import React from 'react';
import CommonFields from './CommonFields';

const sizeOptions = [
  {
    value: 'short',
    label: 'Short',
  },
  {
    value: 'long',
    label: 'Long',
  },
];

function AskQuestionFields({ subFieldName }) {
  return (
    <CommonFields subFieldName={subFieldName}>
      <Flex
        backgroundColor='rgb(231, 234, 236)'
        paddingY='20px'
        paddingX='8px'
        direction='column'
        gap={5}
      >
        <FormCustomOptionSelector
          label='Size of text area'
          name={`${subFieldName}.inputSize`}
          labelVariant='h3'
          options={sizeOptions}
        />
        <Flex gap={4}>
          <FormTextField
            name={`${subFieldName}.min`}
            label='Min. characters'
            variant='custom'
            labelVariant='h3'
          />
          <FormTextField
            name={`${subFieldName}.max`}
            label='Max. characters'
            variant='custom'
            labelVariant='h3'
          />
        </Flex>
        <FormTextField
          name={`${subFieldName}.pattern`}
          label='Regex Pattern'
          variant='custom'
          labelVariant='h3'
        />
        <FormTextField
          name={`${subFieldName}.errorMessage`}
          label='Error Message'
          variant='custom'
          labelVariant='h3'
          type='textarea'
        />
      </Flex>
      <Divider />
    </CommonFields>
  );
}

export { AskQuestionFields };
