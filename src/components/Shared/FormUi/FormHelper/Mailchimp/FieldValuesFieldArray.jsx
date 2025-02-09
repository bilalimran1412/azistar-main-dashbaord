import { Box, FormLabel } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import React from 'react';
import { seedID } from '../../../../../utils';
import { FieldValueItem } from 'components/Shared/SidebarUi';
import { AddItemRoundButton } from 'components/Shared/UiComponents';

function FieldValuesFieldArray({ name = 'fieldValues', dropdownOptions = [] }) {
  const [field] = useField(name);
  const fieldValue = field.value || [];

  const onFieldAdd = (arrayPushHelper) => {
    arrayPushHelper({
      field: '',
      variable: '',
      id: seedID(),
    });
  };
  const isLastItem = fieldValue?.length === 1;

  return (
    <Box>
      <FormLabel variant='h3'>ADD FIELD VALUES</FormLabel>
      <FieldArray name={name}>
        {({ remove, push }) => (
          <Box display='flex' flexDir='column' gap={3}>
            {fieldValue?.map((item, index) => (
              <FieldValueItem
                item={item}
                subFieldName={`${name}[${index}]`}
                onRemove={() => remove(index)}
                key={item.id}
                isLastItem={isLastItem}
                dropdownOptions={dropdownOptions}
              />
            ))}
            <AddItemRoundButton onClick={() => onFieldAdd(push)} />
          </Box>
        )}
      </FieldArray>
    </Box>
  );
}

export { FieldValuesFieldArray };
