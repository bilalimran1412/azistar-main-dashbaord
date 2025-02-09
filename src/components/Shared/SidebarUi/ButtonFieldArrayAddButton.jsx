import { Box } from '@chakra-ui/react';
import React from 'react';

function ButtonFieldArrayAddButton({
  handleAddButton,
  label = 'Add another Button...',
  buttonStyles = {},
  containerStyles = {},
}) {
  return (
    <Box
      w={'100%'}
      borderRadius={'100px'}
      bg={'#3A3C5D'}
      minH={'40px'}
      display={'flex'}
      alignItems={'center'}
      textColor={'#fff'}
      style={{ cursor: 'pointer', ...containerStyles }}
      gap={'16px'}
      onClick={handleAddButton}
      fontSize='12px'
    >
      <Box
        width={'40px'}
        height={'40px'}
        bg={'#9CA3AF'}
        borderRadius={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        display={'flex'}
        textColor={'#fff'}
        fontSize='28px'
        style={{ ...buttonStyles }}
      >
        +
      </Box>
      {label}
    </Box>
  );
}

export default ButtonFieldArrayAddButton;
