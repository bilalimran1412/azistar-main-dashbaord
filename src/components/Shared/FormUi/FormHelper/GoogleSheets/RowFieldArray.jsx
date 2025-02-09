import { Box } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import React from 'react';
import { seedID } from '../../../../../utils';
import { RowItem } from 'components/Shared/SidebarUi';
import { AddItemRoundButton } from 'components/Shared/UiComponents';

function RowFieldArray({ name = 'fieldValues', dropdownOptions = [] }) {
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
      <FieldArray name={name}>
        {({ remove, push }) => (
          <Box display='flex' flexDir='column' gap={3}>
            {fieldValue?.map((item, index) => (
              <RowItem
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

export { RowFieldArray };
