import React from 'react';
import { useField } from 'formik';
import {
  FormHelperText,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';

const getOptionGroups = (options) => {
  const groups = {};
  options?.forEach((option) => {
    if (option.group) {
      if (!groups[option.group]) {
        groups[option.group] = [];
      }
      groups[option.group].push(option);
    }
  });
  return groups;
};

const FormDropdown = ({
  name,
  options,
  label,
  placeholder = 'Select option',
  onChange,
  className = '',
  labelVariant = '',
  containerStyle = {},
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);
  const optionGroups = getOptionGroups(options);
  const isError = meta.touched && !!meta.error;

  const handleChange = (value) => {
    helpers.setValue(value);
    onChange && onChange(value);
  };

  return (
    <FormControl isInvalid={isError} style={{ ...containerStyle }}>
      {label && (
        <FormLabel htmlFor={name} variant={labelVariant}>
          {label}
        </FormLabel>
      )}
      <Select
        id={name}
        placeholder={placeholder}
        variant='outline'
        borderColor={isError ? 'red.500' : 'gray.200'}
        onChange={(e) => handleChange(e.target.value)}
        value={field.value}
        className={className}
        {...rest}
      >
        {Object.keys(optionGroups)?.map((groupLabel) => (
          <optgroup key={groupLabel} label={groupLabel}>
            {optionGroups[groupLabel]?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </optgroup>
        ))}
        {Object.keys(optionGroups).length === 0 &&
          options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </Select>
      {isError && <FormHelperText color='red.500'>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default FormDropdown;
