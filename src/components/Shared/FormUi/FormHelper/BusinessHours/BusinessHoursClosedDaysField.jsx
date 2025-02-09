import { Divider, Text, Box, Button, Flex, Icon } from '@chakra-ui/react';
import React, { forwardRef } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

import {
  BusinessHoursFieldWrapper,
  radioOptions,
} from 'components/Shared/SidebarUi';
import { FieldArray, useField } from 'formik';
import { FormDatePicker, FormDateRangePicker, FormRadio } from '../..';
import { MdClose } from 'react-icons/md';

function BusinessHoursClosedDaysField({ name }) {
  const [field] = useField(name);
  const fieldValue = field.value || [];
  return (
    <BusinessHoursFieldWrapper
      title='3. Closed days'
      contentContainerProps={{
        style: { display: 'flex' },
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Text mb={3}>Define days in which your business will be closed.</Text>
      <Divider />

      <FieldArray name={name}>
        {({ push, remove }) => (
          <Box>
            {fieldValue.map((closedDay, index) => (
              <Box
                key={index}
                display='flex'
                flexDirection='column'
                gap={5}
                sx={{
                  '.react-datepicker-wrapper': {
                    width: '100%',
                  },
                }}
                mb={2}
              >
                <CloseDayDynamicField
                  subfieldName={`${name}[${index}]`}
                  closedDay={closedDay}
                />
                <Icon
                  as={MdClose}
                  cursor='pointer'
                  onClick={() => remove(index)}
                />
                <Divider />
              </Box>
            ))}
            <Button width='100%' onClick={() => push({ type: 'day', day: '' })}>
              Add day
            </Button>
          </Box>
        )}
      </FieldArray>
    </BusinessHoursFieldWrapper>
  );
}
export { BusinessHoursClosedDaysField };

const CustomTimeInputField = forwardRef(
  ({ value, onClick, label = 'Select Day' }, ref) => (
    <Button
      onClick={onClick}
      ref={ref}
      variant='outline'
      colorScheme='blue'
      width='100%'
      padding='1rem'
      justifyContent='space-between'
      leftIcon={<Icon as={FaCalendarAlt} boxSize={5} />}
    >
      <Flex justify='center' width='100%'>
        <Text>{value || label}</Text>
      </Flex>
    </Button>
  )
);

export default CustomTimeInputField;

function CloseDayDynamicField({ subfieldName, closedDay }) {
  return (
    <>
      <FormRadio
        label=''
        name={`${subfieldName}.type`}
        options={radioOptions}
      />

      {closedDay.type === 'day' ? (
        <FormDatePicker
          name={`${subfieldName}.day`}
          customInput={<CustomTimeInputField />}
        />
      ) : (
        <FormDateRangePicker
          name={`${subfieldName}.range`}
          customInput={<CustomTimeInputField label='Select range' />}
          selectsRange
        />
      )}
    </>
  );
}
