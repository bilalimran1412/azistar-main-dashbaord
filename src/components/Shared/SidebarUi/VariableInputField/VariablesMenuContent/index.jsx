import React from 'react';

import { PopoverContent, PopoverBody } from '@chakra-ui/react';
import CustomMenuList from './CustomMenuList';

function VariablesMenuContent({
  inputValue,
  handleOptionClick,
  allowedType,
  onCreateClick,
  popupType,
  setInputValue,
}) {
  return (
    <PopoverContent
      onMouseDown={(e) => {
        popupType !== 'button' && e.preventDefault();
      }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      width='100%'
      style={{
        overflow: 'auto',
        maxHeight: '240px',
        borderColor: '#cfd0d1',
        borderRadius: '0 0 3px 3px',
        backgroundColor: '#fff',
        borderTop: 'none',
        minWidth: '280px',
        // minHeight: '240px',
      }}
    >
      <PopoverBody
        style={{
          padding: 0,
        }}
      >
        <CustomMenuList
          inputValue={inputValue}
          handleOptionClick={handleOptionClick}
          allowedType={allowedType}
          onCreateClick={onCreateClick}
          popupType={popupType}
          setInputValue={setInputValue}
        />
      </PopoverBody>
    </PopoverContent>
  );
}
export default VariablesMenuContent;
