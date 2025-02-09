import React from 'react';
import {
  Input,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

const TagInputField = ({
  tags,
  onTagAdd,
  onTagRemove,
  inputValue,
  onInputChange,
}) => {
  const inputRef = React.useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      const values = inputValue.split(',').map((val) => val.trim());
      const newTags = values.filter((val) => val !== '');
      onTagAdd([...newTags]);
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      onTagRemove(tags.length - 1);
    }
  };

  return (
    <Box
      border='1px solid'
      borderColor='gray.300'
      borderRadius='md'
      p={2}
      _focusWithin={{ borderColor: 'teal.500' }}
      w='100%'
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
      sx={{
        backgroundColor: 'white',
        border: '1px solid rgba(16, 22, 26, .2) !important',
        borderRadius: '3px',
        height: 'auto',
        padding: '6px 15px',
        outline: 'none !important',
        fontWeight: 400,
        lineHeight: '30px',
        transition: 'box-shadow .1s cubic-bezier(.4,1,.75,.9)',
        verticalAlign: 'middle',
        fontSize: 'large',
        boxShadow: 'none',
      }}
    >
      <Wrap spacing={2}>
        {tags.map((tag, index) => (
          <WrapItem key={index}>
            <Tag
              size='md'
              borderRadius='full'
              variant='solid'
              colorScheme='blue'
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => onTagRemove(index)} />
            </Tag>
          </WrapItem>
        ))}
        <WrapItem flexGrow={1} minW='100px'>
          <Input
            value={inputValue}
            onChange={onInputChange}
            onKeyDown={handleKeyDown}
            variant='unstyled'
            ref={inputRef}
            minW='20px'
            width='80px'
            flex='1 1 auto'
          />
        </WrapItem>
      </Wrap>
    </Box>
  );
};

export { TagInputField };
