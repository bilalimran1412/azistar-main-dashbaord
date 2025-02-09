import { Box, Button, FormLabel } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import React from 'react';
import { seedID } from '../../../../../utils';
import { MdAdd } from 'react-icons/md';
import { ExtraFieldItem } from 'components/Shared/SidebarUi';

function ExtraFieldsArray({ name, label = 'Extra fields' }) {
  const [field] = useField(name);
  const fieldValue = field.value || [];

  const onFieldAdd = (arrayPushHelper) => {
    arrayPushHelper({
      key: '',
      value: '',
      id: seedID(),
    });
  };

  return (
    <Box mt={4}>
      <FormLabel variant='h1'>{label}</FormLabel>
      <FieldArray name={name}>
        {({ remove, push }) => (
          <Box display='flex' flexDir='column' gap={3}>
            {fieldValue?.map((item, index) => (
              <ExtraFieldItem
                item={item}
                subFieldName={`${name}[${index}]`}
                onRemove={() => remove(index)}
                key={item.id}
              />
            ))}
            <Button
              leftIcon={<MdAdd />}
              onClick={() => onFieldAdd(push)}
              variant='outline'
              backgroundColor={'#fff'}
              borderRadius='3px'
              fontSize='14px'
              maxH='30px'
              px='10px'
              py='5px'
              textAlign='left'
              verticalAlign='middle'
              mt={3}
              w='fit-content'
              colorScheme='blue'
            >
              Add
            </Button>
          </Box>
        )}
      </FieldArray>
    </Box>
  );
}

export { ExtraFieldsArray };
