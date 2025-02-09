import React, { forwardRef } from 'react';
import {
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  InputRightElement,
  Button,
  Text,
} from '@chakra-ui/react';

const VariableInput = forwardRef(
  (
    {
      placeholder = 'Enter text...',
      containerStyle = {},
      styles = {},
      isOpen = false,
      enableCreate = false,
      selectedVariable,
      selectedVarConfig,
      onOpen = () => {},
      onCreateClick = () => {},
      onInputChange = () => {},
      inputValue = '',
      handleBlur = () => {},
      handleFocus = () => {},
      isFocused,
      rest = {},
    },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        tabIndex={0}
        padding='10px 8px'
        fontSize='12px'
        display='inline-flex'
        backgroundColor='#fff'
        border='1px solid #cfd0d1'
        width='100%'
        height='46px'
        boxShadow={isFocused ? '0 1px 10px -1px #6268e55c' : 'none'}
        borderRadius={isOpen ? '3px 3px 0 0' : '3px'}
      >
        <CustomInput
          placeholder={placeholder}
          containerStyle={containerStyle}
          styles={styles}
          isOpen={isOpen}
          enableCreate={enableCreate}
          selectedVariable={selectedVariable}
          selectedVarConfig={selectedVarConfig}
          onOpen={onOpen}
          onCreateClick={onCreateClick}
          onInputChange={onInputChange}
          inputValue={inputValue}
          handleBlur={handleBlur}
          handleFocus={handleFocus}
          isFocused={isFocused}
          rest={rest}
        />
      </Box>
    );
  }
);

export default VariableInput;

export const CustomInput = ({
  placeholder = 'Enter text...',
  containerStyle = {},
  styles = {},
  isOpen = false,
  enableCreate = false,
  selectedVariable,
  selectedVarConfig,
  onOpen = () => {},
  onCreateClick = () => {},
  onInputChange = () => {},
  inputValue = '',
  handleBlur = () => {},
  handleFocus = () => {},
  rest = {},
}) => {
  return (
    <FormControl
      style={{
        display: 'flex',
        alignItems: 'center',
        ...containerStyle,
      }}
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          minHeight={0}
          minWidth={0}
          style={{
            height: '100%',
            width: '20px',
          }}
        >
          <Text
            fontSize='14px'
            lineHeight='16px'
            fontWeight='700'
            ml='5px'
            position='relative'
          >
            @
          </Text>
        </InputLeftElement>
        <Input
          placeholder={placeholder}
          {...rest}
          style={{
            fontSize: '14px',
            height: '30px',
            padding: '0 30px',
            ...styles,
          }}
          onClick={() => {
            if (!isOpen) {
              onOpen();
            }
          }}
          variant='unstyled'
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={inputValue}
          onChange={({ target }) => {
            onInputChange(target);
          }}
          autoComplete='off'
        />
        <InputRightElement
          minHeight={0}
          minWidth={0}
          style={{
            height: '100%',
            width: 'auto',
          }}
        >
          {enableCreate && (
            <Button
              minH={0}
              minW={0}
              h='22px'
              paddingX={4}
              borderRadius={0}
              backgroundColor='rgb(215, 55, 107)'
              _hover={{
                backgroundColor: 'rgb(215, 55, 107)',
              }}
              onClick={() => {
                onCreateClick();
                handleFocus();
              }}
            >
              <Text fontSize='12px' textTransform='uppercase' color='white'>
                Create
              </Text>
            </Button>
          )}
          {selectedVariable && selectedVarConfig && !enableCreate && (
            <Box
              bg='gray.200'
              borderRadius='full'
              width='24px'
              height='24px'
              display='flex'
              alignItems='center'
              justifyContent='center'
              mx={3}
            >
              <Text fontSize='12px' fontWeight='700'>
                {selectedVarConfig.icon}
              </Text>
            </Box>
          )}
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};
