import React from 'react';
import { useField } from 'formik';
import { Box, FormLabel, Text } from '@chakra-ui/react';

const FormWeekDaysSelect = ({ name, label, ...rest }) => {
  const [field, meta, helpers] = useField(name);
  const { value: selectedDays } = field;

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleDayClick = (index) => {
    const newSelection = selectedDays?.includes(index)
      ? selectedDays?.filter((d) => d !== index)
      : [...(selectedDays || []), index];

    helpers.setValue(newSelection);
  };

  const isError = meta.touched && !!meta.error;

  return (
    <Box>
      {label && <FormLabel variant='h3'>{label}</FormLabel>}
      <Box display='flex' gap={2} {...rest}>
        {daysOfWeek.map((day, index) => (
          <Box
            key={index}
            display='flex'
            justifyContent='center'
            alignItems='center'
            width='30px'
            height='30px'
            borderRadius='50%'
            bg={selectedDays?.includes(index) ? 'blue.700' : 'gray.300'}
            color={selectedDays?.includes(index) ? 'white' : 'black'}
            fontSize='12px'
            fontWeight='bold'
            cursor='pointer'
            onClick={() => handleDayClick(index)}
            style={{
              transition: 'background-color 0.3s, color 0.3s',
              ...rest.style,
              ':hover': {
                backgroundColor: selectedDays?.includes(index)
                  ? 'blue.600'
                  : 'gray.400',
                color: 'white',
              },
            }}
          >
            {day}
          </Box>
        ))}
      </Box>
      {isError && (
        <Text color='red.500' mt={2}>
          {meta.error}
        </Text>
      )}
    </Box>
  );
};

export default FormWeekDaysSelect;
