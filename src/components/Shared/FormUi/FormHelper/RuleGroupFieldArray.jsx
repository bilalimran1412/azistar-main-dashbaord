import React from 'react';
import { useField, FieldArray } from 'formik';
import {
  Box,
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { seedID } from '../../../../utils';
import { FormDropdown } from '..';
import SortableRuleFieldArray from './SortableRuleFieldArray';
import { getLabel, SAMPLE_DROPDOWN_OPTIONS } from 'components/Shared/SidebarUi';

const RuleGroupFieldArray = ({ name }) => {
  const [field] = useField(name);
  const arrayHelpersRef = React.useRef(null);

  const fieldValue = field.value || [];

  const handleExpand = (index) => {
    if (!arrayHelpersRef.current) {
      return;
    }
    const arrayHelpers = arrayHelpersRef.current;
    const updatedValues = field.value.map((item, i) => ({
      ...item,
      isExpanded: i === index ? !item.isExpanded : false,
    }));

    updatedValues.forEach((value, i) => arrayHelpers.replace(i, value));
  };

  const handelAddGroup = () => {
    if (!arrayHelpersRef.current) {
      return;
    }
    const arrayHelpers = arrayHelpersRef.current;
    const updatedValues = field.value.map((item, i) => ({
      ...item,
      isExpanded: false,
    }));

    updatedValues.forEach((value, i) => arrayHelpers.replace(i, value));
    arrayHelpers.push({
      id: seedID(),
      isExpanded: true,
      rules: [],
    });
  };
  const isLastItem = fieldValue?.length === 1;
  const expandedItem = fieldValue?.findIndex((item) => item?.isExpanded);

  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => {
        if (!arrayHelpersRef.current) {
          arrayHelpersRef.current = arrayHelpers;
        }
        return (
          <Box display='flex' flexDirection='column' gap={8}>
            <Accordion
              allowToggle
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
              index={expandedItem}
            >
              {fieldValue.map((item, index) => (
                <AccordionItem
                  border='none'
                  padding={5}
                  paddingY={4}
                  backgroundColor='#fff'
                  boxShadow='0 0 0 1px #10161a26, 0 0 #10161a00, 0 0 #10161a00'
                  borderRadius='3px'
                  key={item?.id}
                >
                  <>
                    <h2>
                      <AccordionButton
                        paddingX={0}
                        _hover={{
                          backgroundColor: 'none',
                        }}
                        flexDirection='column'
                        alignItems='flex-start'
                        gap={2}
                        onClick={() => handleExpand(index)}
                      >
                        <Box width='100%' display='flex'>
                          <Box
                            width='100%'
                            display='flex'
                            justifyContent='space-between'
                            alignItems='center'
                          >
                            <Text
                              flex='1'
                              textAlign='left'
                              style={{
                                fontWeight: '700',
                                fontSize: '17px',
                              }}
                              width='auto'
                            >
                              Rule group
                              {item?.variable
                                ? ` (@${getLabel(item.variable).label})`
                                : `# ${index + 1}`}
                            </Text>
                            {!isLastItem && (
                              <Icon
                                as={FaTrash}
                                width='22px'
                                onClick={(e) => {
                                  e.stopPropagation();
                                  arrayHelpers.remove(index);
                                }}
                                marginRight={3}
                              />
                            )}
                          </Box>
                          <AccordionIcon />
                        </Box>

                        {!item?.isExpanded && (
                          <Text opacity={0.8} textAlign='left'>
                            Click to expand
                          </Text>
                        )}
                      </AccordionButton>
                    </h2>
                    <AccordionPanel padding={0} overflow='visible'>
                      <FormDropdown
                        name={`${name}[${index}].variable`}
                        label='Choose a variable to create scoring rules for'
                        options={SAMPLE_DROPDOWN_OPTIONS}
                        labelVariant='h3'
                        variant='custom'
                      />
                      {item?.variable && (
                        <Box marginTop={5}>
                          <SortableRuleFieldArray
                            name={`${name}[${index}].rules`}
                            ruleGroupIndex={index}
                            selectedVariable={item?.variable}
                          />
                        </Box>
                      )}
                    </AccordionPanel>
                  </>
                </AccordionItem>
              ))}
            </Accordion>
            <Button onClick={handelAddGroup}>Add</Button>
          </Box>
        );
      }}
    />
  );
};

export default RuleGroupFieldArray;
