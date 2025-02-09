import React from 'react';
import { useField } from 'formik';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  Tooltip,
  Text,
  Grid,
} from '@chakra-ui/react';
import { useSchemaContext } from './AzistarForm';
const textAreaStyles = {
  backgroundColor: 'white',
  border: '1px solid rgba(16, 22, 26, .2) !important',
  borderRadius: '3px',
  height: 'auto',
  padding: '6px 15px',
  outline: 'none !important',
  fontWeight: 400,
  lineHeight: '20px',
  transition: 'box-shadow .1s cubic-bezier(.4,1,.75,.9)',
  verticalAlign: 'middle',
  fontSize: 'large',
  boxShadow: 'none',
  _focus: {
    boxShadow: '0 1px 10px -1px rgba(98, 104, 229, 0.36) !important',
  },
};
const FormTextField = ({
  name,
  label,
  placeholder,
  type = 'text',
  readonly = false,
  helpText = '',
  subHeaderText = '',
  autoLowerCase = false,
  hideHelperText = false,
  containerStyle = {},
  containerSx = {},
  maxNumber,
  showCounter = false,
  fullWidth = true,
  className = '',
  labelVariant = '',
  ...rest
}) => {
  const [field, meta, helper] = useField(name);
  const { validationSchema } = useSchemaContext();

  const isFieldRequired = React.useMemo(() => {
    try {
      const fieldSchema = validationSchema.describe().fields[name];
      const isRequiredSchema = fieldSchema.tests.find(
        (test) => test.name === 'requiredTest'
      );
      if (isRequiredSchema) return true;
      return !fieldSchema.optional;
    } catch {
      return false;
    }
  }, [name, validationSchema]);

  const counter = React.useMemo(() => {
    const fieldSchema = validationSchema.describe().fields[name];
    const minTest = fieldSchema?.tests.find((test) => test.name === 'min');
    const maxTest = fieldSchema?.tests.find((test) => test.name === 'max');
    return { min: minTest?.params?.min, max: maxTest?.params?.max };
  }, [name, validationSchema]);

  const isError = meta.touched && !!meta.error;

  const handleChange = (event) => {
    if (type !== 'number') {
      if (event.target.value.length > counter.max) return;
      field.onChange(event);
    }

    const inputValue = event.target.value;
    if (maxNumber && +inputValue > maxNumber) return;
    if (/^-?\d*\.?\d{0,2}$/.test(inputValue)) {
      helper.setValue(inputValue);
    }
  };

  return (
    <Grid
      flexDirection='column'
      style={{ ...containerStyle }}
      width={fullWidth ? '100%' : '50%'}
      sx={{ ...containerSx }}
    >
      <Box display='flex' flexDirection='column'>
        <FormLabel
          marginLeft={1}
          display='flex'
          alignItems='center'
          gap={1}
          width='100%'
          variant={labelVariant}
        >
          {isFieldRequired && '*'}
          {label}
          {helpText && (
            <Tooltip label={helpText} placement='top' hasArrow>
              <InfoOutlineIcon fontSize='small' />
            </Tooltip>
          )}
          <Box flexGrow={1} />
          {showCounter && counter.max && (
            <Text
              fontSize={12}
              textAlign='right'
              paddingRight={4}
              color={isError ? 'red.500' : 'gray.500'}
            >
              {field.value.length}/{counter.max}
            </Text>
          )}
        </FormLabel>

        {subHeaderText && (
          <Text color='gray.500' marginLeft={2} fontSize={12} textAlign='left'>
            {subHeaderText}
          </Text>
        )}
      </Box>

      <FormControl isInvalid={isError} paddingX='2px'>
        {type === 'textarea' ? (
          <Textarea
            placeholder={placeholder}
            isReadOnly={readonly}
            value={autoLowerCase ? field.value.toLowerCase() : field.value}
            onChange={handleChange}
            sx={{ ...textAreaStyles, ...rest.sx }}
            {...field}
            {...rest}
            className={className}
          />
        ) : (
          <Input
            type={type}
            placeholder={placeholder}
            isReadOnly={readonly}
            value={autoLowerCase ? field.value.toLowerCase() : field.value}
            onChange={handleChange}
            {...field}
            {...rest}
            inputMode={type === 'number' ? 'decimal' : undefined}
            min={0}
            max={maxNumber}
            className={className}
          />
        )}

        {!hideHelperText && (
          <FormHelperText
            color={isError ? 'red.500' : 'gray.500'}
            marginLeft={1}
          >
            {isError ? meta.error : ' '}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};

export default FormTextField;
