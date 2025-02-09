import { Box, Flex, Text } from '@chakra-ui/react';
import {
  DraftEditorField,
  FormDropdown,
  FormTextField,
} from '../../FormUi';
import React from 'react';
import { conditionsOptions, getLabel } from './data';

const scoreSignOptions = [
  {
    value: '+',
    label: '+',
  },
  {
    label: '-',
    value: '-',
  },
];

function RuleSettings({
  subFieldName,
  handleFieldItemPropChange,
  fieldValue,
  selectedVariable,
}) {
  const selectedVariableValue = getLabel(selectedVariable);
  const conditionDropdownOptions =
    conditionsOptions[selectedVariableValue.type];
  const selectedOption = conditionDropdownOptions?.find(
    (option) => option.value === fieldValue?.condition
  );

  const dateInput = selectedVariableValue.type === 'DATE';
  return (
    <Flex
      bg={'#8a9ba826'}
      borderRadius={'3px'}
      flex={1}
      padding='10px 12px 9px'
      direction='column'
      gap={5}
      sx={{
        '.chakra-popover__popper': {
          marginLeft: '-90px !important',
        },
      }}
    >
      <Flex
        gap={4}
        sx={{
          '.DraftEditor-root': {
            padding: '7px 13px  !important',
            maxH: '36px',
          },
          '.draft-editor-container': {
            maxH: '36px',
          },
        }}
      >
        <Box width='50%'>
          <FormDropdown
            name={`${subFieldName}.condition`}
            label='Meets this condition'
            options={conditionDropdownOptions}
            onChange={(value) => {
              handleFieldItemPropChange({
                condition: value,
              });
            }}
            labelVariant='h3White'
            variant='customMini'
          />
        </Box>
        {selectedOption?.args > 0 && (
          <>
            {dateInput ? (
              <FormTextField
                name={`${subFieldName}.args[0]`}
                label='Argument'
                labelVariant='h3White'
                variant='customMini'
                fullWidth={false}
                type='date'
              />
            ) : (
              <>
                <DraftEditorField
                  name={`${subFieldName}.args[0]`}
                  label='Argument'
                  labelVariant='h3White'
                  variant='custom'
                  type='inline'
                  containerStyles={{
                    width: '50%',
                  }}
                  setOnlyText={true}
                />
              </>
            )}
          </>
        )}
      </Flex>
      {selectedOption?.args === 2 && (
        <Flex
          alignItems='flex-end'
          direction='column'
          sx={{
            '.DraftEditor-root': {
              padding: '7px 13px !important',
              maxH: '36px',
            },
            '.draft-editor-container': {
              maxH: '36px',
            },
          }}
        >
          <Text textAlign='center' width='50%' fontSize='small' color='#fff'>
            AND
          </Text>
          {dateInput ? (
            <FormTextField
              name={`${subFieldName}.args[1]`}
              label=''
              labelVariant='h3White'
              variant='customMini'
              fullWidth={false}
              {...(dateInput && { type: 'date' })}
            />
          ) : (
            <>
              <DraftEditorField
                name={`${subFieldName}.args[1]`}
                label=''
                labelVariant='h3White'
                variant='custom'
                type='inline'
                containerStyles={{
                  width: '50%',
                }}
                setOnlyText={true}
              />
            </>
          )}
        </Flex>
      )}
      <Flex gap={4}>
        <FormDropdown
          name={`${subFieldName}.scoreSign`}
          label='Then assign this score'
          labelVariant='h3White'
          variant='customMini'
          options={scoreSignOptions}
          onChange={(value) => {
            handleFieldItemPropChange({
              scoreSign: value,
            });
          }}
        />
        <FormTextField
          name={`${subFieldName}.score`}
          label='Value'
          labelVariant='h3White'
          variant='customMini'
        />
      </Flex>
    </Flex>
  );
}

export { RuleSettings };
