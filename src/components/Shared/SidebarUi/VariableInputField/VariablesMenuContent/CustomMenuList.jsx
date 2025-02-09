import { Box, Text, Divider, Input } from '@chakra-ui/react';
import React from 'react';

import CustomMenuOption from './CustomMenuOptions';
import CreateVariableOption from './CreateVariableOption';
import { variableDropdownManager } from '../utils';
import { useDropdownStore } from 'zustandStores';

const CustomMenuList = ({
  handleOptionClick,
  inputValue,
  allowedType,
  onCreateClick,
  popupType,
  setInputValue,
}) => {
  const groupedOptions = useDropdownStore((store) => store.groupedOptions);

  const { isEmpty, hasExtractValue, filteredOptions } = variableDropdownManager(
    allowedType,
    inputValue,
    groupedOptions
  );

  return (
    <Box
      sx={{
        'hr:last-of-type': { display: 'none' },
      }}
    >
      <>
        {popupType === 'button' && (
          <Input
            value={inputValue}
            onChange={({ target }) => {
              setInputValue(target.value);
            }}
            variant='custom'
            sx={{
              borderLeft: 'none !important',
              borderRight: 'none !important',
              boxShadow: 'none !important',
              borderRadius: '0px',
            }}
            _hover={{
              boxShadow: 'none !important',
            }}
            placeholder='Search...'
          />
        )}
        {isEmpty && inputValue?.length > 2 ? (
          <CreateVariableOption
            inputValue={inputValue}
            onCreateClick={onCreateClick}
          />
        ) : (
          <>
            {!hasExtractValue && inputValue?.length > 2 && (
              <CreateVariableOption
                inputValue={inputValue}
                onCreateClick={onCreateClick}
              />
            )}
            <>
              {filteredOptions.map((groupedOptions, index) => (
                <React.Fragment key={index}>
                  <Box position='sticky' top={0} bg='white' zIndex={1}>
                    <Text
                      mx={3}
                      textTransform='uppercase'
                      fontSize='11px'
                      paddingY={2}
                      color='gray.400'
                    >
                      {groupedOptions.label}
                    </Text>
                  </Box>
                  {groupedOptions?.options?.map((option, index) => (
                    <CustomMenuOption
                      option={option}
                      handleOptionClick={handleOptionClick}
                      key={index}
                    />
                  ))}
                  <Divider my={2} />
                </React.Fragment>
              ))}
              {!isEmpty && (
                <Box mt={2}>
                  <Box
                    p={4}
                    bg='gray.50'
                    borderTop='1px solid #e2e8f0'
                    cursor='default'
                    _hover={{ bg: 'gray.50' }}
                  >
                    <Text fontSize='sm' color='gray.600'>
                      Information about variables
                    </Text>
                  </Box>
                </Box>
              )}
            </>
          </>
        )}
      </>
    </Box>
  );
};
export default CustomMenuList;
