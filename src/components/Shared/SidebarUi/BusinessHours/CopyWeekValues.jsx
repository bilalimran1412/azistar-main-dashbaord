import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  Checkbox,
  Button,
  VStack,
  Divider,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { FaRegCopy } from 'react-icons/fa';
import { weekdays } from './data';

function CopyWeekValues({ fieldName, dayClicked }) {
  const [field] = useField(fieldName);
  const [selectedFieldValues] = useField(`openHours.${dayClicked}`);
  const { setFieldValue } = useFormikContext();
  const [selectedDays, setSelectedDays] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (value) => {
    setSelectedDays((prev) =>
      prev.includes(value)
        ? prev.filter((day) => day !== value)
        : [...prev, value]
    );
  };

  const options = React.useMemo(
    () => weekdays.filter((day) => day !== dayClicked),
    [dayClicked]
  );
  const handleApply = () => {
    const valueToApply = selectedFieldValues.value;
    selectedDays.forEach((day) => {
      setFieldValue(`openHours.${day}`, valueToApply);
    });

    setSelectedDays([]);
    setIsOpen(false);
  };

  return (
    <>
      {field.value?.enabled && (
        <Box position='absolute' right='70px' top='-5px'>
          <Box position='relative'>
            <Popover
              placement='auto'
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            >
              <PopoverTrigger>
                <IconButton
                  icon={<FaRegCopy />}
                  onClick={() => setIsOpen(true)}
                  minH={0}
                  minW={0}
                  backgroundColor='transparent'
                  height='auto'
                />
              </PopoverTrigger>
              <PopoverContent width='120px'>
                <PopoverArrow />
                <PopoverHeader fontWeight='bold'>Copy To:</PopoverHeader>
                <PopoverBody>
                  <VStack spacing={3} align='start'>
                    {options.map((day) => (
                      <React.Fragment key={day}>
                        <Checkbox
                          isChecked={selectedDays.includes(day)}
                          onChange={() => handleCheckboxChange(day)}
                          fontSize={'12px'}
                        >
                          <Text> {day}</Text>
                        </Checkbox>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </VStack>
                </PopoverBody>
                <PopoverFooter display='flex' justifyContent='center'>
                  <Button colorScheme='blue' onClick={handleApply}>
                    Apply
                  </Button>
                </PopoverFooter>
              </PopoverContent>
            </Popover>
          </Box>
        </Box>
      )}
    </>
  );
}

export { CopyWeekValues };
