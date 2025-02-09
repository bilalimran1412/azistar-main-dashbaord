import React, { useRef, useState } from 'react';
import {
  Box,
  FormLabel,
  Popover,
  PopoverTrigger,
  useDisclosure,
  useOutsideClick,
  Portal,
  Button,
} from '@chakra-ui/react';
import CreateVariableContent from './CreateVariableContent';
import ListVariableContent from './VariablesMenuContent';
import { useDropdownStore } from 'zustandStores';
import { variableDropdownManager } from './utils';
import { possibleFormatOptions } from 'config/constant';
import VariableInput from './VariableInput';

function VariableInputField({
  containerStyle,
  allowedType = 'all',
  readOnly = true,
  label,
  placeholder,
  styles,
  onSelect = () => {},
  initialValue,
  labelVariant = 'h3',
  // popupType will be button or input, it will define the trigger element and design changes
  popupType = 'input',
  popoverProps,
  ...rest
}) {
  const [contentType, setContentType] = React.useState('list');
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue?.value || '');
  const [selectedVariable, setSelectedVariable] = React.useState(initialValue);
  const containerRef = useRef(null);
  const popoverContainer = useRef(null);

  const groupedOptions = useDropdownStore((store) => store.groupedOptions);

  const addCustomVariable = useDropdownStore(
    (store) => store.addCustomVariable
  );

  const { enableCreate } = variableDropdownManager(
    allowedType,
    inputValue,
    groupedOptions
  );

  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  const handleFocus = () => {
    setIsFocused(true);
    onOpen();
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  useOutsideClick({ ref: popoverContainer, handler: onClose });

  const handleOptionClick = (option) => {
    if (popupType !== 'button') {
      setInputValue(option?.value);
      setSelectedVariable(option);
    }
    onSelect(option);
    onClose();
  };

  const onCreateClick = () => {
    if (allowedType === 'all') {
      setContentType('create');
    } else {
      const createdOption = addCustomVariable(inputValue, allowedType);
      if (popupType !== 'button') {
        setSelectedVariable(createdOption);
      }

      onSelect(createdOption);
      onClose();
    }
  };
  const onInputChange = (target) => {
    setInputValue(target.value);
    if (!isOpen) {
      onOpen();
    }
    if (selectedVariable) {
      setSelectedVariable(null);
    }
  };

  const onVariableContentCreate = (type) => {
    const createdOption = addCustomVariable(inputValue, type);
    if (popupType !== 'button') {
      setSelectedVariable(createdOption);
    } else {
      setInputValue('');
    }
    onSelect(createdOption);
    setContentType('list');
    onClose();
  };
  const selectedVarConfig = initialValue
    ? possibleFormatOptions[initialValue?.type]
    : possibleFormatOptions[selectedVariable?.type];

  return (
    <Box>
      {label && <FormLabel variant={labelVariant}>{label}</FormLabel>}
      <Box ref={popoverContainer}>
        <Popover
          isOpen={isOpen}
          closeOnBlur={true}
          autoFocus={false}
          matchWidth
          closeDelay={100}
          openDelay={100}
          offset={0}
          {...popoverProps}
        >
          <PopoverTrigger>
            {popupType === 'button' ? (
              <Button
                onClick={onToggle}
                bgColor='gray.200'
                borderRadius='3px'
                height='30px'
                fontSize='10px'
                padding='5px 10px'
                minW='30px'
                textTransform='uppercase'
              >
                {placeholder || `Variable`}
              </Button>
            ) : (
              <VariableInput
                ref={containerRef}
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
            )}
          </PopoverTrigger>
          <Portal containerRef={popoverContainer}>
            {contentType === 'list' && (
              <ListVariableContent
                inputValue={inputValue}
                handleOptionClick={handleOptionClick}
                allowedType={allowedType}
                onCreateClick={onCreateClick}
                popupType={popupType}
                setInputValue={setInputValue}
              />
            )}
            {contentType === 'create' && (
              <CreateVariableContent
                onClose={() => {
                  setContentType('list');
                  onClose();
                }}
                inputValue={inputValue}
                onVariableContentCreate={onVariableContentCreate}
                setInputValue={setInputValue}
              />
            )}
          </Portal>
        </Popover>
      </Box>
    </Box>
  );
}

export default VariableInputField;
