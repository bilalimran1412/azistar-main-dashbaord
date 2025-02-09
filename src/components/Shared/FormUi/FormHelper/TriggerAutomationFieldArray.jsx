import { FieldArray, useField } from 'formik';
import { Flex, Button, Icon } from '@chakra-ui/react';
import FormVariableSelectorDropdown from '../FormVariableSelectorDropdown';
import { FormTextField } from '..';
import { FaTrash } from 'react-icons/fa';

function TriggerAutomationFieldArray({ name }) {
  const [field] = useField(name);
  const fieldValue = field.value || [];
  const isLastItem = fieldValue?.length === 1;
  return (
    <FieldArray name={name}>
      {({ push, remove }) => (
        <div>
          {fieldValue?.map((_, index) => (
            <Flex key={index} mb={4} alignItems={'center'} gap={1}>
              <FormVariableSelectorDropdown
                name={`${name}[${index}]`}
                label='Field Name'
              />
              <FormTextField
                name={`${name}[${index}].testValue`}
                label='Test Value'
                labelVariant='h3'
                variant='custom'
                containerSx={{
                  'input + div': {
                    display: 'none',
                  },
                }}
              />
              {!isLastItem && (
                <Icon
                  mt={2}
                  as={FaTrash}
                  width='22px'
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(index);
                  }}
                  cursor='pointer'
                />
              )}
            </Flex>
          ))}
          <Button
            onClick={() => push({ textValue: '' })}
            variant='outline'
            colorScheme='blue'
          >
            Add
          </Button>
        </div>
      )}
    </FieldArray>
  );
}

export { TriggerAutomationFieldArray };
