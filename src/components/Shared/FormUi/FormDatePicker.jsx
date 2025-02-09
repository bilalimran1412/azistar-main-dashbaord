import React from 'react';
import { useField } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormControl, Box } from '@chakra-ui/react';

const FormDatePicker = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const selectedDate = field.value ? new Date(field.value) : '';

  const onChange = (date) => {
    helpers.setValue(date?.toISOString());
  };

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <Box>
        <DatePicker
          id={name}
          selected={selectedDate}
          onChange={onChange}
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

export { FormDatePicker };
