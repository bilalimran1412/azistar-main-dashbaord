import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { groupBy } from '../../utils/arrayHelper';
import {
  FormCheckbox,
  FormCustomOptionSelector,
  FormDropdown,
  MessageFieldArray,
  SortableButtonCreatorInputFieldArray,
} from '../Shared/FormUi';
import { messageFieldArrayInitialValue } from '../Shared/FormUi/FormHelper/MessageFieldArray';
import { Divider, Flex, Text } from '@chakra-ui/react';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';
import { useFormikContext } from 'formik';
import { evaluateInitialValue } from '../../utils/form';

const minMaxOptions = [
  {
    label: 'No',
    value: false,
  },
  {
    label: 'Yes',
    value: true,
  },
];

const buttonFeatureOptions = [
  {
    name: 'buttonsAlignment',
    label: 'Button alignment',
    options: [
      { label: 'Horizontal', value: 'horizontal' },
      { label: 'Vertical', value: 'vertical' },
    ],
  },
  {
    name: 'randomizeOrder',
    label: 'Randomize order',
    options: [
      { label: 'No', value: false },
      { label: 'Yes', value: true },
    ],
  },
  {
    name: 'searchableOptions',
    label: 'Searchable options',
    options: [
      { label: 'No', value: false },
      { label: 'Yes', value: true },
    ],
  },
];
const multipleChoice = {
  name: 'multipleChoices',
  label: 'Multiple choices',
  options: [
    { label: 'No', value: false },
    { label: 'Yes', value: true },
  ],
};
function ButtonNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];

  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    mediaAndMessage:
      currentNode?.data?.params?.mediaAndMessage ||
      messageFieldArrayInitialValue?.message,
    variable:
      currentNode?.data?.params?.variable || config?.data.params.variable,

    buttons:
      currentNode?.data?.params?.buttons || config.data?.params?.buttons || '',
    minMaxOptions: evaluateInitialValue(
      currentNode?.data?.params?.minMaxOptions ||
        config.data?.params?.minMaxOptions
    ),
    buttonsAlignment:
      currentNode?.data?.params?.buttonsAlignment ||
      config.data?.params?.buttonsAlignment ||
      '',
    randomizeOrder: evaluateInitialValue(
      currentNode?.data?.params?.randomizeOrder ||
        config.data?.params?.randomizeOrder
    ),
    searchableOptions: evaluateInitialValue(
      currentNode?.data?.params?.searchableOptions ||
        config.data?.params?.searchableOptions
    ),
    multipleChoices: evaluateInitialValue(
      currentNode?.data?.params?.multipleChoices ||
        config.data?.params?.multipleChoices
    ),
    outputAsArray: evaluateInitialValue(
      currentNode?.data?.params?.outputAsArray ||
        config.data?.params?.outputAsArray
    ),
    min: currentNode?.data?.params?.min || config.data?.params?.min || '',
    max: currentNode?.data?.params?.max || config.data?.params?.max || '',
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const variableName = formValues.variable.value;

    const groupedValues = groupBy(formValues.mediaAndMessage, 'type');

    updateNodeById(id, {
      params: {
        ...formValues,
        variableName,
        ...(groupedValues || {}),
      },
    });

    handleClose();
  };

  return (
    <SidebarFormContainer
      block={config}
      onClose={handleClose}
      onFormSave={onSave}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onReset={handleClose}
    >
      <MessageFieldArray name='mediaAndMessage' label='Write a message' />
      <SortableButtonCreatorInputFieldArray name='buttons' isSortable={true} />
      {buttonFeatureOptions.map((options) => (
        <FormCustomOptionSelector
          name={options.name}
          key={options.name}
          label={options.label}
          options={options.options}
          labelVariant='h3'
        />
      ))}
      <Divider />
      <FormCustomOptionSelector
        name={multipleChoice.name}
        key={multipleChoice.name}
        label={multipleChoice.label}
        options={multipleChoice.options}
        labelVariant='h3'
      />
      <MultipleChoiceSubFields />
      <Divider />

      <FormVariableSelectorDropdown
        name='variable'
        readOnly
        allowedType={config?.variableType}
      />
    </SidebarFormContainer>
  );
}

export default ButtonNodeContent;

function MultipleChoiceSubFields() {
  const { values } = useFormikContext();
  const minMaxValues = values?.buttons.length;
  const minMaxDropdownOptions = Array.from({ length: minMaxValues || 0 }).map(
    (value, index) => ({ value: index + 1, label: index + 1 })
  );
  const maxDropdownOptions = [
    ...minMaxDropdownOptions,
    {
      value: 'all',
      label: 'All options',
    },
  ];
  return (
    <>
      {values?.multipleChoices && (
        <Flex flex={1} direction='column' gap={2}>
          <Flex direction='column' gap={2}>
            <Text>
              When Multiple choice is activated, the flow will follow the
              Default output. More info{' '}
              <Text color='#5757ff' as='span'>
                here.
              </Text>
            </Text>
            <FormCheckbox
              name='outputAsArray'
              label='Save output as an Array type variable'
              labelVariant='basic'
            />
          </Flex>
          <Flex direction='column' bg='lightgray' p={3}>
            <FormCustomOptionSelector
              name='minMaxOptions'
              label='Set min/max options'
              labelVariant='h3'
              options={minMaxOptions}
            />
            {values?.minMaxOptions && (
              <Flex gap={4} direction='column'>
                <FormDropdown
                  name='min'
                  label='Minimum'
                  options={minMaxDropdownOptions}
                  labelVariant='h2'
                  variant='custom'
                />
                <FormDropdown
                  name='max'
                  label='Maximum'
                  options={maxDropdownOptions}
                  labelVariant='h2'
                  variant='custom'
                />
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
}
