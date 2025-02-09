import {
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
  useOutsideClick,
  Portal,
  Button,
  Flex,
} from '@chakra-ui/react';
import { possibleFormatOptions } from 'config/constant';
import React, { useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';

function VariableTypeSelection({ type, setType }) {
  const ref1 = useRef(null);
  const { onOpen, onClose, isOpen } = useDisclosure();
  useOutsideClick({ ref: ref1, handler: onClose });

  const types = ['STRING', 'ARRAY', 'BOOLEAN', 'NUMBER', 'DATE'];

  return (
    <Box ref={ref1}>
      <Popover
        isOpen={isOpen}
        matchWidth
        closeOnBlur={true}
        autoFocus={false}
        closeDelay={0}
        openDelay={0}
        offset={0}
      >
        <PopoverTrigger>
          <Button
            rightIcon={<FaChevronDown />}
            colorScheme='gray'
            variant='solid'
            style={{
              minHeight: 0,
              height: '32px',
              fontSize: '12px',
              padding: '1px',
            }}
            width='100%'
            onClick={onOpen}
          >
            {type}
          </Button>
        </PopoverTrigger>

        <Portal appendToParentPortal={true}>
          <Box pos='absolute' zIndex={1001}>
            <PopoverContent
              width='100%'
              style={{
                overflow: 'auto',
                maxHeight: '240px',
                borderColor: '#cfd0d1',
                borderRadius: '3px',
                backgroundColor: '#fff',
              }}
            >
              <PopoverBody
                style={{
                  padding: '0',
                }}
              >
                <Box py={1} display='flex' flexDirection='column'>
                  {types.map((type) => {
                    const typeConfig = possibleFormatOptions[type];
                    return (
                      <Flex
                        align='center'
                        cursor='pointer'
                        onClick={() => setType(type)}
                        _hover={{
                          backgroundColor: 'gray.400',
                        }}
                        paddingY={1}
                        key={type}
                      >
                        <Box
                          bg='gray.200'
                          borderRadius='full'
                          width='24px'
                          height='24px'
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          mx={3}
                        >
                          <Text fontSize='12px' fontWeight='700'>
                            {typeConfig.icon}
                          </Text>
                        </Box>

                        <Text fontSize='12px'>{typeConfig.label}</Text>
                      </Flex>
                    );
                  })}
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Box>
        </Portal>
      </Popover>
    </Box>
  );
}
export default VariableTypeSelection;
