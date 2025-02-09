import React from 'react';
import { useField } from 'formik';
import { Box, Button, FormLabel } from '@chakra-ui/react';

// CUSTOM OPTIONS FOR STARTING
// const selectionOptions = [
//   { label: 'Long', value: 'long' },
//   { label: 'Short', value: 'short' },
// ];
const FormCustomOptionSelector = ({
  name,
  options,
  label,
  bgColor = '#D0D7DD',
  labelVariant,
}) => {
  const [field, , helpers] = useField(name);

  return (
    <Box
      display={'flex'}
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      w={'100%'}
      gap={'1rem'}
    >
      <FormLabel variant={labelVariant}>{label}</FormLabel>
      <Box
        display={'flex'}
        bg={bgColor}
        p={'2px'}
        borderRadius={'3px'}
        justifyContent={'space-between'}
        alignItems={'center'}
        w='min-content'
      >
        {options.map((option) => {
          const isSelected = field.value === option.value;
          const buttonStyle = {
            border: 'none',
            fontSize: '11px',
            textTransform: 'uppercase',
            backgroundColor: isSelected ? 'white' : bgColor,
            color: isSelected ? 'black' : 'white',
          };

          return (
            <Button
              key={option.value}
              onClick={() => helpers.setValue(option.value)}
              borderRadius='8px'
              fontWeight={'smaller'}
              style={{
                ...buttonStyle,
                color: 'red !important',
                borderRadius: '2px',
              }}
            >
              {option.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default FormCustomOptionSelector;
