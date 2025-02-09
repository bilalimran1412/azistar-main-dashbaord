import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';

function CreateVariableOption({ inputValue, onCreateClick }) {
  return (
    <Box
      display='flex'
      cursor='pointer'
      _hover={{
        backgroundColor: '#ddd',
      }}
      padding={2}
      marginY={1}
      gap={2}
      alignItems='center'
      fontWeight='500'
      fontStyle={'italic'}
      onClick={() => {
        onCreateClick(inputValue);
      }}
    >
      <FiPlusCircle />
      <Text>{inputValue}</Text>
      <Text>(new)</Text>
    </Box>
  );
}

export default CreateVariableOption;
