import React from 'react';
import { useField } from 'formik';
import {
  Checkbox,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Grid,
} from '@chakra-ui/react';

const FormCheckbox = ({
  name,
  label,
  checkboxLabel,
  containerStyle = {},
  labelVariant = '',
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);

  const isError = meta.touched && !!meta.error;

  const handleChange = (e) => {
    const { checked } = e.target;
    helpers.setValue(checked);
  };

  return (
    <Grid flexDirection='column' style={containerStyle} width='100%'>
      <Box display='flex' flexDirection='row' alignItems='center' gap='5px'>
        <Box>
          <Checkbox
            {...field}
            {...rest}
            id={name}
            defaultChecked={field?.value}
            onChange={handleChange}
          >
            {checkboxLabel}
          </Checkbox>
        </Box>
        <FormLabel
          htmlFor={name}
          marginLeft={1}
          display='flex'
          alignItems='center'
          variant={labelVariant}
          width='auto'
        >
          {label}
        </FormLabel>
      </Box>

      <FormControl isInvalid={isError}>
        {isError && (
          <FormHelperText color='red.500'>{meta.error}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};

export default FormCheckbox;
