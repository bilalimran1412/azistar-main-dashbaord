import { Text } from '@chakra-ui/react';
import {
  BusinessHoursFieldWrapper,
  BusinessHoursOpenDay,
  CopyWeekValues,
  TimeRangePickerFieldArray,
  weekdays,
} from 'components/Shared/SidebarUi';
import React from 'react';
import { FormToggleSwitch } from '../..';
import { useField, FieldArray } from 'formik';

function BusinessHoursOpenHoursField({ name }) {
  const [field] = useField(name);

  return (
    <BusinessHoursFieldWrapper title='2. Business Hours'>
      <Text mb={3}>
        Define the days and hours when your business will be open.
      </Text>
      {weekdays.map((day) => (
        <BusinessHoursOpenDay key={day}>
          <CopyWeekValues fieldName={`${name}.${day}`} dayClicked={day} />
          <FormToggleSwitch name={`${name}.${day}.enabled`} label={day} />
          {field.value[day]?.enabled && (
            <FieldArray
              name={`${name}.${day}.time`}
              render={({ push, remove }) => (
                <TimeRangePickerFieldArray
                  fieldValue={field.value[day]}
                  onAdd={push}
                  onRemove={remove}
                  subfieldName={`${name}.${day}`}
                />
              )}
            />
          )}
        </BusinessHoursOpenDay>
      ))}
    </BusinessHoursFieldWrapper>
  );
}

export { BusinessHoursOpenHoursField };
