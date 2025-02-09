import { Divider, Flex } from '@chakra-ui/react';
import React from 'react';
import CommonFields from './CommonFields';
import {
  DateSelectorFieldArray,
  FormCheckbox,
  FormDropdown,
  FormWeekdaysSelect,
} from '../../../../Shared/FormUi';
import { useField, useFormikContext } from 'formik';
const formatOptions = [
  { value: 'yyyy/MM/dd', label: 'YYYY/MM/DD - 2023/09/19' },
  { value: 'yy/MM/dd', label: 'YY/MM/DD - 23/09/19' },
  { value: 'dd/MM/yyyy', label: 'DD/MM/YYYY - 19/09/2023' },
  { value: 'dd/MM/yy', label: 'DD/MM/YY - 19/09/23' },
  { value: 'MM/dd/yy', label: 'MM/DD/YY - 09/19/23' },
  { value: 'MM/dd/yyyy', label: 'MM/DD/YYYY - 09/19/2023' },
];
const enabledDatesOptions = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'past',
    label: 'Past dates only',
  },
  {
    value: 'future',
    label: 'Future dates only',
  },
  {
    value: 'custom',
    label: 'Custom range',
  },
];
const defaultRange = [
  {
    fromDate: '',
    toDate: '',
  },
];
function AskDateFields({ subFieldName }) {
  return (
    <CommonFields subFieldName={subFieldName}>
      <Flex
        backgroundColor='rgb(231, 234, 236)'
        paddingY='20px'
        paddingX='8px'
        direction='column'
        gap={5}
      >
        <FormDropdown
          name='format'
          variant='custom'
          labelVariant='h3'
          options={formatOptions}
          label='Format to save the date'
        />
        <FormCheckbox
          label='Show date picker'
          name={`${subFieldName}.showDatePicker`}
          labelVariant='h3'
        />
        <Divider />
        <DateTypeDropdown name={`${subFieldName}.enabledCustomRanges`} />
        <DateSelectorField subFieldName={subFieldName} />
        <Divider />
        <FormWeekdaysSelect
          name={`${subFieldName}.enabledDaysOfWeek`}
          label='Disable specific days'
        />
      </Flex>
      <Divider />
    </CommonFields>
  );
}

export { AskDateFields };

function DateTypeDropdown({ name }) {
  const { setFieldValue } = useFormikContext();
  return (
    <FormDropdown
      name='enabledDateType'
      variant='custom'
      options={enabledDatesOptions}
      labelVariant='h3'
      label='Set available dates'
      onChange={() => setFieldValue(name, defaultRange)}
    />
  );
}
function DateSelectorField({ subFieldName }) {
  const [field] = useField('enabledDateType');

  return (
    <DateSelectorFieldArray
      name={`${subFieldName}.enabledCustomRanges`}
      enabledDateType={field.value}
    />
  );
}
