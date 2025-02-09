import { Box, Button } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import React from 'react';
import { seedID } from '../../../../../utils';
import { ParamsFieldItem } from 'components/Shared/SidebarUi';

function ParamsFieldArray({ name = 'params' }) {
  const [field] = useField(name);
  const fieldValue = field.value || [];

  const onKeyAdd = (arrayPushHelper) => {
    arrayPushHelper({
      key: '',
      value: '',
      id: seedID(),
    });
  };
  const isLastItem = fieldValue?.length === 1;
  return (
    <Box>
      <FieldArray name={name}>
        {({ remove, push }) => (
          <Box mt={5}>
            {fieldValue?.map((item, index) => (
              <ParamsFieldItem
                item={item}
                subFieldName={`${name}[${index}]`}
                onRemove={() => remove(index)}
                key={item.id}
                isLastItem={isLastItem}
              />
            ))}
            <Button
              onClick={() => onKeyAdd(push)}
              variant='outline'
              backgroundColor={'#fff'}
              borderRadius='3px'
              fontSize='14px'
              maxH='30px'
              px='10px'
              py='5px'
              textAlign='left'
              verticalAlign='middle'
              textTransform='uppercase'
              mt={3}
            >
              Add Key
            </Button>
          </Box>
        )}
      </FieldArray>
    </Box>
  );
}

export { ParamsFieldArray };
