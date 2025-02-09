import { Box, Icon } from '@chakra-ui/react';
import React from 'react';
import { FieldArray, useField } from 'formik';
import FormTextField from '../FormTextField';
import { MdAdd } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

function DateSelectorFieldArray({ name, enabledDateType }) {
  const [field] = useField(name);

  const onAdd = (arrayHelpers) => {
    arrayHelpers.push({ fromDate: '', toDate: '' });
  };

  const onDelete = (arrayHelpers, index) => {
    arrayHelpers.remove(index);
  };
  const fieldValue = field.value || [];

  const isLastField = fieldValue?.length === 1;

  return (
    <>
      {enabledDateType === 'custom' && (
        <FieldArray
          name={name}
          render={(arrayHelpers) => (
            <>
              <Box background='lightgray' padding='6px'>
                {fieldValue.map((dateRange, index) => (
                  <Box position='relative' key={index} display='flex'>
                    <Box
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      width='100%'
                    >
                      <FormTextField
                        name={`${name}.${index}.fromDate`}
                        type='date'
                        label='From Date'
                        labelVariant='h3'
                        variant='custom'
                        fullWidth={false}
                      />
                      <FormTextField
                        name={`${name}.${index}.toDate`}
                        type='date'
                        label='To Date'
                        labelVariant='h3'
                        variant='custom'
                        fullWidth={false}
                      />
                      {!isLastField && (
                        <Icon
                          fontSize='larger'
                          top={1}
                          right={1}
                          pos='absolute'
                          cursor='pointer'
                          onClick={() => onDelete(arrayHelpers, index)}
                        >
                          <FaTrash />
                        </Icon>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box
                onClick={() => onAdd(arrayHelpers)}
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
                }}
              >
                <MdAdd />
              </Box>
            </>
          )}
        />
      )}
    </>
  );
}

export default DateSelectorFieldArray;
