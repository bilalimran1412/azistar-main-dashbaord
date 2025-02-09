import React from 'react';
import { useField } from 'formik';
import {
  FormControl,
  FormLabel,
  Switch,
  FormHelperText,
  Box,
  Grid,
} from '@chakra-ui/react';

const FormToggleSwitch = ({
  name,
  label,
  containerStyle = {},
  labelVariant,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);

  const isError = meta.touched && !!meta.error;

  const handleToggle = (event) => {
    helpers.setValue(event.target.checked);
  };

  return (
    <Grid flexDirection='column' style={containerStyle} width='100%'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        cursor='pointer'
        onClick={handleToggle}
        paddingLeft='4px'
      >
        <FormLabel
          htmlFor={name}
          width='auto'
          cursor='pointer'
          variant={labelVariant}
        >
          {label}
        </FormLabel>
        <Switch
          id={name}
          isChecked={field.value}
          onChange={handleToggle}
          {...rest}
        />
      </Box>

      <FormControl isInvalid={isError}>
        {isError && (
          <FormHelperText color='red.500'>{meta.error}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};

export default FormToggleSwitch;
