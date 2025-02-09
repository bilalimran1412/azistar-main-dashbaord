import { Divider, Flex } from '@chakra-ui/react';
import { FormDropdown, FormTextField } from '../../../FormUi';
import React from 'react';
import CommonFields from './CommonFields';
const formatOptions = [
  { label: 'Auto', value: 'auto' },
  { label: 'Decimals', value: 'decimals' },
  { label: 'Whole Numbers', value: 'wholeNumbers' },
];
function AskNumberFields({ subFieldName }) {
  return (
    <CommonFields subFieldName={subFieldName}>
      <Flex
        backgroundColor='rgb(231, 234, 236)'
        paddingY='20px'
        paddingX='8px'
        direction='column'
        gap={5}
      >
        <Flex gap={4}>
          <FormDropdown
            name={`${subFieldName}.format`}
            label='Format'
            options={formatOptions}
            variant='custom'
            labelVariant='h3'
          />
          <FormTextField
            name={`${subFieldName}.prefix`}
            label='Prefix'
            placeholder='Examples: $, %/'
            variant='custom'
            labelVariant='h3'
          />
        </Flex>
        <Flex gap={4}>
          <FormTextField
            name={`${subFieldName}.min`}
            label='Min. Value'
            variant='custom'
            labelVariant='h3'
          />
          <FormTextField
            name={`${subFieldName}.max`}
            label='Max. Value'
            variant='custom'
            labelVariant='h3'
          />
        </Flex>
      </Flex>
      <Divider />
    </CommonFields>
  );
}

export { AskNumberFields };
