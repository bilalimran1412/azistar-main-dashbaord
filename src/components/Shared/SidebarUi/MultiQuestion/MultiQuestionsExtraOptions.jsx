import { Flex, Text } from '@chakra-ui/react';
import { columnWidthOptions, getFieldsByType } from './multiQuestionData';
import { ExtraOptionsAccordion } from 'components/Shared/UiComponents';
import { FormDropdown, FormTextField } from '../../FormUi';

function MultiQuestionExtraOptions({ fieldValue, subFieldName }) {
  const fields = getFieldsByType(fieldValue?.config?.type);

  if (!fields.length) {
    return <Text color='#fff'>Select field to enable options</Text>;
  }
  return (
    <ExtraOptionsAccordion>
      <Flex flexDirection='column'>
        <Flex wrap='wrap' justifyContent='space-between'>
          {fields.map((field, index) => {
            const isLastUnpaired =
              index === fields.length - 1 && fields.length % 2 !== 0;
            if (field.type === 'dropdown') {
              return (
                <FormDropdown
                  key={index}
                  name={`${subFieldName}.${field.name}`}
                  label={field.label}
                  options={columnWidthOptions}
                  placeholder={field.placeholder}
                  containerStyle={{
                    flexBasis: isLastUnpaired ? '100%' : '48%',
                  }}
                  labelVariant='h3White'
                  variant='customMini'
                />
              );
            }
            return (
              <FormTextField
                key={index}
                name={`${subFieldName}.${field.name}`}
                label={field.label}
                placeholder={field.placeholder}
                containerStyle={{
                  flexBasis: isLastUnpaired ? '100%' : '48%',
                }}
                labelVariant='h3White'
                variant='customMini'
              />
            );
          })}
        </Flex>
      </Flex>
    </ExtraOptionsAccordion>
  );
}
export default MultiQuestionExtraOptions;
