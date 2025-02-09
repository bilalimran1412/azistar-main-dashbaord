import React, { useState } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import { menuOptionList } from '../../config/nodeConfigurations';

const NodeDropdownMenu = ({ handleAddNode, dropdownPosition }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMenuItems = menuOptionList.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      position='absolute'
      paddingY={4}
      paddingX={2}
      top={dropdownPosition.y}
      left={dropdownPosition.x}
      zIndex='10'
      bg='white'
      border='1px solid'
      borderColor='gray.200'
      borderRadius='3px'
      boxShadow='lg'
      minW='240px'
      className='nowheel nodrag'
    >
      <InputGroup mb='3'>
        <InputLeftElement pointerEvents='none' sx={{ width: '24px' }}>
          <Icon as={MdSearch} color='gray.400' mt={1} />
        </InputLeftElement>
        <Input
          placeholder='Search by name'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          focusBorderColor='blue.400'
          variant='custom'
          sx={{ paddingLeft: 5 }}
        />
      </InputGroup>

      <VStack align='start' spacing='1' maxH='200px' overflowY='auto'>
        {filteredMenuItems.length > 0 ? (
          filteredMenuItems.map(({ blockId, label, icon: BlockIcon }) => (
            <Flex
              key={blockId}
              onClick={() => handleAddNode(blockId)}
              align='center'
              width='full'
              padding='2'
              borderRadius='3px'
              cursor='pointer'
              _hover={{ bg: 'gray.100' }}
              transition='background-color 0.2s'
              gap={2}
            >
              <Box
                sx={{
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  svg: { width: '20px', height: '20px' },
                }}
              >
                {BlockIcon}
              </Box>
              <Text fontSize='sm'>{label}</Text>
            </Flex>
          ))
        ) : (
          <Text padding='4' textAlign='center' color='gray.500'>
            No results found
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default NodeDropdownMenu;
