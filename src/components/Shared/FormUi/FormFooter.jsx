import { Box, Button, ButtonGroup, Text } from '@chakra-ui/react';
import React from 'react';

function FormFooter({ form }) {
  return (
    <Box
      width='full'
      display='flex'
      justifyContent='space-between'
      backgroundColor='#3a3d5c'
      gap={2}
      marginTop='auto'
      height='60px'
      minHeight='60px'
      position='sticky'
      bottom='0'
      alignItems='center'
      paddingX={5}
      zIndex={4}
    >
      <Text color='white'>Apply Changes?</Text>
      <ButtonGroup>
        <Button type='reset' backgroundColor='#ebf1f5' form={form}>
          Cancel
        </Button>
        <Button
          type='submit'
          backgroundColor='#cd3c79'
          color='white'
          form={form}
          _hover={{
            backgroundColor: '#cd4c7f',
          }}
        >
          Apply
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default FormFooter;
