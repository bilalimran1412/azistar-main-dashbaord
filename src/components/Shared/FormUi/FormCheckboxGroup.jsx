import React from 'react';
import { useField, useFormikContext } from 'formik';
import {
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Grid,
  Stack,
  Text,
} from '@chakra-ui/react';

const FormCheckboxGroup = ({
  name,
  label,
  options = [],
  containerStyle = {},
  labelVariant = '',
  direction = 'column',
  ...rest
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const isError = meta.touched && !!meta.error;

  const handleChange = (selectedValues) => {
    setFieldValue(name, selectedValues);
  };

  return (
    <Grid flexDirection='column' style={containerStyle} width='100%'>
      <Box>
        <FormLabel
          htmlFor={name}
          display='flex'
          alignItems='center'
          variant={labelVariant}
        >
          {label}
        </FormLabel>
      </Box>

      <FormControl isInvalid={isError}>
        <CheckboxGroup
          {...field}
          value={field.value || []}
          onChange={handleChange}
        >
          <Stack direction={direction}>
            {options.map((option) => (
              <Checkbox
                key={option.value}
                value={option.value}
                isChecked={field.value?.includes(option.value)}
              >
                <Text>{option.label}</Text>
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>

        {isError && (
          <FormHelperText color='red.500'>{meta.error}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};

export default FormCheckboxGroup;
