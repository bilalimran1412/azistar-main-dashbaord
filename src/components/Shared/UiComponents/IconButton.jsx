import { IconButton } from '@chakra-ui/react';
import React from 'react';

function UiIconButton({ icon, label = '', onClick, style = {}, ...rest }) {
  return (
    <IconButton
      aria-label={label}
      icon={icon}
      background='none'
      color='white'
      cursor='pointer'
      style={{
        height: '32px',
        padding: '0 8px',
        minWidth: 0,
        margin: 0,
        border: 'none',
        ...style,
      }}
      onClick={onClick}
      {...rest}
    />
  );
}

export default UiIconButton;
