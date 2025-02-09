import { Box } from '@chakra-ui/react';
import React from 'react';
import { MdAdd } from 'react-icons/md';

function AddItemRoundButton({ buttonStyles, onClick }) {
  return (
    <Box
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        color: 'white',
        background: '#cc3c79',
        height: '32px',
        width: '32px',
        alignSelf: 'flex-end',
        cursor: 'pointer',
        ...buttonStyles,
      }}
      onClick={onClick}
    >
      <MdAdd />
    </Box>
  );
}

export { AddItemRoundButton };
