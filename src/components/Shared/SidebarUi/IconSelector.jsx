import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { buttonCreatorIcons } from '../../../config/constant';

function IconSelector({ setIcon, selectedIcon }) {
  return (
    <Box
      flexWrap={'wrap'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      minH='50px'
      px='8px'
      fontSize='14px'
      fontWeight='semibold'
      width={'100%'}
      gap={'8px'}
      bg={'#4D5273'}
      border={'1px'}
      borderColor={'gray'}
      borderRadius={'3px'}
      p={'8px'}
      overflow={'hidden'}
      overflowY={'auto'}
      h={'80px'}
    >
      {Object.entries(buttonCreatorIcons).map(([key, Icon]) => (
        <Button
          key={key}
          _hover={{
            color: selectedIcon !== key ? '#fff' : 'inherit',
            cursor: 'pointer',
          }}
          p={'0'}
          m={'0'}
          width={'30px'}
          height={'30px'}
          bg={'transparent'}
          backgroundColor={selectedIcon === key ? 'white' : 'inherit'}
          color={selectedIcon === key ? 'black' : 'inherit'}
          onClick={() => {
            setIcon(key);
          }}
        >
          <Icon />
        </Button>
      ))}
    </Box>
  );
}

export default IconSelector;
