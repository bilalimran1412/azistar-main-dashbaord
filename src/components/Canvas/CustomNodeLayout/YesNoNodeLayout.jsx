import React from 'react';
import CustomHandle from '../CustomHandle';
import { Box, Text } from '@chakra-ui/react';

function YesNoNodeLayout({ onClick, buttons, id }) {
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
              id={`source-${id}-${item.id}`}
              onClick={() => onClick(`source-${id}-${item.id}`)}
              styles={{
                right: '-5px',
              }}
            />
          </Box>
        ))}

      <Box
        key='placeholder'
        bg='rgb(221, 221, 255)'
        outline='1px solid #6361f0'
        color='#6361f0'
        borderRadius='4px'
        display='flex'
        my='3px'
        position='relative'
        justifyContent='space-between'
        p='6px 25px'
        textTransform='capitalize'
        w='100%'
        fontSize='14px'
      >
        <Text>Any of the above</Text>
        <CustomHandle
          type='source'
          id={`source-placeholder-${id}`}
          onClick={() => onClick(`source-placeholder-${id}`)}
          styles={{
            right: '-5px',
          }}
        />
      </Box>
    </Box>
  );
}

export default YesNoNodeLayout;
