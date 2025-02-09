import { Box, Button } from '@chakra-ui/react';
import { FieldArray, useField } from 'formik';
import React from 'react';
import { seedID } from '../../../../../utils';
import { HubspotSaveResponseFieldItem } from 'components/Shared/SidebarUi';

function SaveResponseFieldArray({
  name = 'saveResponse',
  dropdownOptions = [],
}) {
  const [field] = useField(name);
  const fieldValue = field.value || [];

  const onAdd = (arrayPushHelper) => {
    arrayPushHelper({
      response: '',
      variable: '',
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
              <HubspotSaveResponseFieldItem
                item={item}
                subFieldName={`${name}[${index}]`}
                onRemove={() => remove(index)}
                key={item.id}
                isLastItem={isLastItem}
                dropdownOptions={dropdownOptions}
              />
            ))}
            <Button
              onClick={() => onAdd(push)}
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
              Add
            </Button>
          </Box>
        )}
      </FieldArray>
    </Box>
  );
}

export { SaveResponseFieldArray as HubspotSaveResponseFieldArray };
