import { Box, Divider } from '@chakra-ui/react';
import React from 'react';

function BusinessHoursOpenDay({ children }) {
  return (
    <Box>
      <Divider />
      <Box my={6} position='relative'>
        {children}
      </Box>
    </Box>
  );
}

export { BusinessHoursOpenDay };
