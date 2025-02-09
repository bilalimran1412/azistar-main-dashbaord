import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormControl, Box } from '@chakra-ui/react';

const FormDateRangePicker = ({ name, ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const { startDate, endDate } = field.value || {};

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    setFieldValue(name, {
      ...(start && { startDate: start?.toISOString() }),
      ...(end && { endDate: end?.toISOString() }),
    });
  };

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <Box>
        <DatePicker
          id={name}
          selectsRange
          startDate={startDate ? new Date(startDate) : ''}
          endDate={endDate ? new Date(endDate) : ''}
          onChange={handleDateChange}
          {...props}
        />
      </Box>
      {meta.touched && meta.error ? (
        <Box color='red.500' mt={2}>
          {meta.error}
        </Box>
      ) : null}
    </FormControl>
  );
};

export { FormDateRangePicker };
