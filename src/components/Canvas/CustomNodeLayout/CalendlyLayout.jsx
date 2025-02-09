import React from 'react';
import CustomHandle from '../CustomHandle';
import { Box, Text } from '@chakra-ui/react';

function CalendlyLayout({ onClick, buttons, id }) {
  return (
    <Box sx={{ display: 'flex' }} flexDirection='column' gap={1}>
      {buttons &&
        buttons.map((item) => (
          <Box
            key={item.id}
            sx={{
              borderRadius: '2px',
              padding: '6px 25px',
              color: '#fff',
              fontSize: '14px',
              background: '#ec5494',
              position: 'relative',
            }}
          >
            <Box
              style={{
                display: 'flex',
                gap: '10px',
                opacity: item.text ? '1' : '0.5',
              }}
            >
              <Text>{item.text || 'Add label'}</Text>
            </Box>
            <CustomHandle
              type='source'
              key={item.id}
              id={`source-${id}-${item.id}-${item.status}`}
              onClick={() =>
                onClick(`source-${id}-${item.id}-${item.status}`, item.status)
              }
              styles={{
                right: '-5px',
              }}
              status={item.status}
            />
          </Box>
        ))}
    </Box>
  );
}

export default CalendlyLayout;
