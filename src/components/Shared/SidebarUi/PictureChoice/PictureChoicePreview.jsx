import React from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

function PictureChoicePreview({ fieldValue }) {
  const showFooter = fieldValue?.highlighted || fieldValue?.buttonText;
  const showAdditionalContent =
    showFooter || fieldValue?.details || fieldValue?.description;

  return (
    <Box>
      <Box
        position='fixed'
        left='490px'
        top='240px'
        border='1px solid'
        borderColor='rgb(204, 204, 204)'
        p={5}
        backgroundColor='rgb(66, 69, 106)'
        borderRadius='6px'
      >
        <Box
          backgroundColor='rgb(234, 234, 234)'
          overflow='hidden'
          borderRadius='3px'
        >
          <Flex
            justifyContent='flex-start'
            position='relative'
            boxShadow='none'
            height='100%'
            margin='0 auto'
            maxWidth='300px'
            direction='column'
            backgroundColor={showAdditionalContent ? 'white' : 'initial'}
            borderRadius={showAdditionalContent ? '6px' : '0'}
            overflow={showAdditionalContent ? 'hidden' : 'visible'}
            _hover={{
              '.select-button': { opacity: 1 },
            }}
          >
            <Box
              width='300px'
              height='300px'
              backgroundSize='cover'
              backgroundPosition='center'
              borderRadius={showAdditionalContent ? '3px' : '0'}
              maxH={!showAdditionalContent ? 'auto' : '200px'}
              overflow='hidden'
              margin='auto'
              backgroundImage={`url(${fieldValue?.image})`}
              position='relative'
            >
              <Box
                position='absolute'
                bottom={0}
                left={0}
                right={0}
                top={0}
                display={showAdditionalContent ? 'none' : 'flex'}
                flexDirection='column'
                justifyContent='flex-end'
                backgroundColor='rgba(0, 0, 0, 0)'
              >
                <Flex
                  padding='33px 30px 10px'
                  background='linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.1) 57%, transparent)'
                  width='100%'
                  alignItems='center'
                  justifyContent={
                    !showAdditionalContent ? 'space-between' : 'flex-end'
                  }
                >
                  {!showAdditionalContent && (
                    <Text color='white' marginRight='10px' flex='1 1 0%'>
                      {fieldValue?.text}
                    </Text>
                  )}
                  <Button
                    className='select-button'
                    backgroundColor='rgb(224, 38, 120)'
                    borderColor='rgb(224, 38, 120)'
                    borderWidth='0px'
                    color='white'
                    cursor='pointer'
                    padding='0.375em 0.75em'
                    textAlign='center'
                    whiteSpace='nowrap'
                    fontSize='16px'
                    opacity={0}
                    transition='opacity 0.2s ease-in-out'
                    _active={{ backgroundColor: 'rgb(224, 38, 120)' }}
                    _hover={{ backgroundColor: 'rgb(224, 38, 120)' }}
                  >
                    Select
                  </Button>
                </Flex>
              </Box>
            </Box>
            {showAdditionalContent && (
              <Box
                borderWidth={1}
                overflow='hidden'
                boxShadow='md'
                p={4}
                bg='white'
              >
                <Box>
                  <Heading as='h1' size='sm' mb={2}>
                    {fieldValue?.text}
                  </Heading>
                  <Text fontSize='xs' fontWeight='medium' mb={1} opacity={0.8}>
                    {fieldValue?.description}
                  </Text>
                  <Text fontSize='xs' fontWeight='medium' opacity={0.6}>
                    {fieldValue?.details}
                  </Text>
                </Box>
                {showFooter && (
                  <Flex as='footer' mt={4} wrap='wrap'>
                    <Box
                      flex='1'
                      display='flex'
                      justifyContent='center'
                      flexDirection='column'
                      maxWidth='100%'
                    >
                      <Text
                        fontWeight='bold'
                        wordBreak='break-word'
                        overflowWrap='anywhere'
                        style={{
                          textWrap: 'balance',
                        }}
                        noOfLines={2}
                      >
                        {fieldValue?.highlighted}
                      </Text>
                    </Box>
                    {fieldValue?.buttonText && (
                      <Box overflow='auto'>
                        <Button
                          type='button'
                          variant='outline'
                          sx={{
                            borderRadius: 'full',
                            overflow: 'hidden',
                            width: '100%',
                            _hover: {
                              bg: 'transparent',
                              borderColor: 'gray.300',
                            },
                            _focus: { boxShadow: 'none' },
                          }}
                        >
                          {fieldValue?.buttonText}
                        </Button>
                      </Box>
                    )}
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        </Box>
        <Heading
          as='h3'
          size='md'
          fontWeight='300 !important'
          mt={4}
          color='white'
        >
          Preview
        </Heading>
      </Box>
    </Box>
  );
}

export { PictureChoicePreview };
