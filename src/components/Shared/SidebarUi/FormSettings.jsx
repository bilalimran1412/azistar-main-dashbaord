import React from 'react';
import { Box, FormLabel, Switch, Collapse, Text } from '@chakra-ui/react';
import { useField } from 'formik';

const FormSettings = ({
  name,
  label,
  children,
  infoText,
  bgColor = '#8a9ba826',
}) => {
  const [field, meta, helpers] = useField({ name, type: 'checkbox' });

  const isExpanded = React.useMemo(() => {
    return field.value;
  }, [field.value]);

  const handleToggle = (event) => {
    helpers.setValue(event.target.checked);
  };

  return (
    <Box bg={bgColor} p={4} borderRadius='md'>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        onClick={handleToggle}
        cursor='pointer'
      >
        <FormLabel mb={0} htmlFor={name} className='bold font13'>
          {label}
        </FormLabel>
        <Switch
          defaultChecked={field.value}
          onChange={handleToggle}
          id={name}
          name={name}
        />
      </Box>
      {infoText && (
        <Text opacity={0.6} mt={4} fontStyle='italic' className='font12'>
          {infoText}
        </Text>
      )}
      <Collapse in={isExpanded}>
        <Box mt={2} display='flex' flexDirection='column' gap='1rem'>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default FormSettings;
