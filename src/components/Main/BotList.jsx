import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BotList({ botList }) {
  const navigate = useNavigate();
  const handleItemClick = (id) => {
    navigate(`/bot/builder/${id}`);
  };
  return (
    <>
      {botList && (
        <VStack spacing={4} w='full'>
          {botList.data.map((item) => (
            <Box
              key={item._id}
              p={4}
              borderWidth='1px'
              borderRadius='md'
              bg='white'
              _hover={{ bg: 'gray.100', cursor: 'pointer' }}
              w='full'
              onClick={() => handleItemClick(item._id)}
            >
              <Text fontWeight='bold'>{item.name}</Text>
              {item.description && <Text>{item.description}</Text>}
              <Text fontSize='sm' color='gray.600'>
                Created At: {new Date(item.createdAt).toLocaleDateString()}
              </Text>
              <Text fontSize='sm' color='gray.600'>
                Updated At: {new Date(item.updatedAt).toLocaleDateString()}
              </Text>
            </Box>
          ))}
        </VStack>
      )}
    </>
  );
}

export default BotList;
