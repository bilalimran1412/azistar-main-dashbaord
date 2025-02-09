import { Box, Text } from '@chakra-ui/react';
import React from 'react';

function SidebarFormCard({
  title,
  children,
  contentContainerProps,
  containerProps = {},
  textStyles = {},
}) {
  return (
    <Box
      padding={5}
      backgroundColor='#fff'
      boxShadow='0 0 0 1px #10161a26, 0 0 #10161a00, 0 0 #10161a00'
      borderRadius='3px'
      {...containerProps}
    >
      <Text
        fontFamily='"DM Sans", sans-serif'
        fontSize='1rem'
        letterSpacing='0'
        lineHeight='24px'
        color='rgb(51, 64, 94)'
        fontWeight='700'
        style={{ ...textStyles }}
      >
        {title}
      </Text>
      <Box marginTop={5} {...contentContainerProps}>
        {children}
      </Box>
    </Box>
  );
}

export { SidebarFormCard };
