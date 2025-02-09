import { Box, Button, HStack } from '@chakra-ui/react';
import { FormDatePicker } from '../../FormUi';
import React from 'react';

function TimeRangePickerFieldArray({
  fieldValue,
  subfieldName,
  onRemove,
  onAdd,
}) {
  return (
    <>
      {fieldValue?.time?.map((time, index) => {
        return (
          <HStack key={index} spacing={4} my={3}>
            <>
              <FormDatePicker
                name={`${subfieldName}.time[${index}].start`}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption='Time'
                dateFormat='HH:mm'
                timeFormat='HH:mm'
                customInput={<CustomTimeInputField />}
              />
              <FormDatePicker
                name={`${subfieldName}.time[${index}].end`}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption='Time'
                dateFormat='HH:mm'
                timeFormat='HH:mm'
                customInput={<CustomTimeInputField />}
              />
              {fieldValue.time?.length > 1 && (
                <Button
                  onClick={() => onRemove(index)}
                  colorScheme='red'
                  variant={'unstyled'}
                >
                  X
                </Button>
              )}
            </>
          </HStack>
        );
      })}
      <Button type='button' onClick={() => onAdd({ start: '', end: '' })}>
        Add Time Range
      </Button>
    </>
  );
}

export { TimeRangePickerFieldArray };

const CustomTimeInputField = React.forwardRef(({ value, onClick }, ref) => (
  <Box
    as='input'
    ref={ref}
    onClick={onClick}
    value={value || 'Select'}
    readOnly
    style={{
      outline: '1px solid black',
      borderRadius: '3px',
      width: '100%',
      padding: '5px',
    }}
  />
));
