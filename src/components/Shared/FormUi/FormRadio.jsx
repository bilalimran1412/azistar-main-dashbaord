import React from 'react';
import { useField, useFormikContext } from 'formik';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Stack,
  Badge,
  Box,
} from '@chakra-ui/react';

const FormRadioGroup = ({ name, label, options, labelVariant, onChange }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (value) => {
    setFieldValue(name, value);
    onChange && onChange(value);
  };
  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel htmlFor={name} variant={labelVariant}>
        {label}
      </FormLabel>
      <RadioGroup id={name} value={field.value} onChange={handleChange}>
        <Stack direction='row' justifyContent='space-evenly'>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      {meta.touched && meta.error ? (
        <Box mt={2}>
          <Badge colorScheme='red'>{meta.error}</Badge>
        </Box>
      ) : null}
    </FormControl>
  );
};

export default FormRadioGroup;
