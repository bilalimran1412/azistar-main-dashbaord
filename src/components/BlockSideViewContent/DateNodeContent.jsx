import React from 'react';
import {
  DateSelectorFieldArray,
  DraftEditorField,
  FormDropdown,
  FormWeekdaysSelect,
} from '../Shared/FormUi';
import * as yup from 'yup';
import { Divider } from '@chakra-ui/react';
import FormCheckbox from '../Shared/FormUi/FormCheckbox';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';
import { useFormikContext } from 'formik';
import { evaluateInitialValue } from '../../utils/form';

const formatOptions = [
  { value: 'yyyy/MM/dd', label: 'YYYY/MM/DD - 2023/09/19' },
  { value: 'yy/MM/dd', label: 'YY/MM/DD - 23/09/19' },
  { value: 'dd/MM/yyyy', label: 'DD/MM/YYYY - 19/09/2023' },
  { value: 'dd/MM/yy', label: 'DD/MM/YY - 19/09/23' },
  { value: 'MM/dd/yy', label: 'MM/DD/YY - 09/19/23' },
  { value: 'MM/dd/yyyy', label: 'MM/DD/YYYY - 09/19/2023' },
];
const enabledDatesOptions = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'past',
    label: 'Past dates only',
  },
  {
    value: 'future',
    label: 'Future dates only',
  },
  {
    value: 'custom',
    label: 'Custom range',
  },
];
const defaultRange = [
  {
    fromDate: '',
    toDate: '',
  },
];
function DateNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;

  const initialValues = {
    //this message will contain all the ops and html and normal text
    message: currentNode?.data?.params?.message || {
      text: config.fields.placeholder,
    },
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,

    variable:
      currentNode?.data?.params?.variable || config.data?.params?.variable,
    format: currentNode?.data?.params?.format || config.data?.params?.format,
    showDatePicker:
      currentNode?.data?.params?.showDatePicker ??
      evaluateInitialValue(config.data?.params?.showDatePicker),
    enabledDateType:
      currentNode?.data?.params?.enabledDateType ||
      config.data?.params?.enabledDateType,
    enabledDaysOfWeek:
      currentNode?.data?.params?.enabledDaysOfWeek ||
      config.data?.params?.enabledDateType,
    enabledCustomRanges:
      currentNode?.data?.params?.enabledCustomRanges ||
      config.data?.params?.enabledCustomRanges,
    error: config.data?.params?.error,
  };

  const validationSchema = yup.object({
    enabledCustomRanges: yup.array().of(
      yup.object({
        fromDate: yup.date().notRequired(),
        toDate: yup
          .date()
          .notRequired()
          .min(yup.ref('fromDate'), 'To Date must be after From Date'),
      })
    ),
  });

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const variableName = formValues.variable.value;
    const enabledDateType = formValues.enabledDateType;

    updateNodeById(id, {
      params: {
        ...formValues,
        variableName,
        ...(enabledDateType !== 'custom' && { enabledCustomRanges: '' }),
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
      <DraftEditorField
        name='message'
        placeholder='Example: <<Select a date, please>>'
        label='Question text'
        labelVariant='h1'
        setNodeContent={true}
      />
      <FormDropdown
        name='format'
        variant='custom'
        options={formatOptions}
        label='Format to save the date'
        labelVariant='h3'
      />
      <FormCheckbox
        name='showDatePicker'
        label='Show date picker'
        labelVariant='h3'
      />
      <Divider />
      <DateTypeDropdown />
      <DateSelectorField />
      <Divider />
      <FormWeekdaysSelect
        name='enabledDaysOfWeek'
        label='Disable specific days'
      />
      <FormVariableSelectorDropdown
        name='variable'
        allowedType={config?.variableType}
      />
    </SidebarFormContainer>
  );
}

export default DateNodeContent;

function DateTypeDropdown() {
  const { setFieldValue } = useFormikContext();
  return (
    <FormDropdown
      name='enabledDateType'
      variant='custom'
      options={enabledDatesOptions}
      label='Set available dates'
      labelVariant='h3'
      onChange={() => setFieldValue('enabledCustomRanges', defaultRange)}
    />
  );
}
function DateSelectorField() {
  const { values } = useFormikContext();

  return (
    <DateSelectorFieldArray
      name={`enabledCustomRanges`}
      enabledDateType={values.enabledDateType}
    />
  );
}
