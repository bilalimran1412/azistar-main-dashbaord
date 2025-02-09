import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { FaImage, FaFile } from 'react-icons/fa';

const FormMediaField = ({ value, onCopy }) => {
  return (
    <Box
      width='100%'
      minH='110px'
      h='100px'
      pos='relative'
      _hover={{ '> .iconGroup': { visibility: 'visible' } }}
    >
      <Flex bg='#d2d5da' flex={1} height='100%' justify='center' align='center'>
        {value ? (
          <Image
            src={value}
            alt='file-preview'
            width='100%'
            height='100%'
            objectFit='cover'
          />
        ) : value ? (
          <FaFile fontSize='48px' />
        ) : (
          <FaImage fontSize='24px' />
        )}
      </Flex>
    </Box>
  );
};

export default FormMediaField;
