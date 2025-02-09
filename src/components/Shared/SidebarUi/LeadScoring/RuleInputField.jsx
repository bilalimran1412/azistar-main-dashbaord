import { Box } from '@chakra-ui/react';
import React from 'react';
import { FaGear } from 'react-icons/fa6';
import { FaGripVertical, FaTrashAlt } from 'react-icons/fa';
import { useField, useFormikContext } from 'formik';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RuleSettings } from './RuleSettings';
import { FormTextField } from '../../FormUi';
import { UiIconButton } from 'components/Shared/UiComponents';
import { conditionsOptions, getLabel } from './data';
const processInputFieldValue = (selectedOption, fieldValue) => {
  // Destructure label and args from selectedOption
  const { label, args } = selectedOption || {};
  const arg1 = fieldValue?.args?.[0] || '';
  const arg2 = fieldValue?.args?.[1] || '';

  let inputFieldValue = '';

  if (label) {
    inputFieldValue += label;
    inputFieldValue += ' ';
  }
  if (args === 1 && arg1) {
    inputFieldValue += arg1;
  }
  if (args === 2) {
    inputFieldValue += `${arg1} AND ${arg2}`;
  }
  if (fieldValue?.scoreSign && label) {
    inputFieldValue += ', ';

    inputFieldValue += fieldValue?.scoreSign;
  }
  if (fieldValue?.score && label) {
    inputFieldValue += fieldValue.score;
    inputFieldValue += ' ';
  }

  return inputFieldValue || '';
};

function RuleInputField({
  name,
  id,
  handleDeleteClick,
  handleFieldItemPropChange,
  selectedVariable,
}) {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
  });

  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const fieldValue = field?.value;

  const handleSettingClick = () => {
    setFieldValue(`${name}.isSettingExpand`, !fieldValue?.isSettingExpand);
  };
  const selectedVariableValue = getLabel(selectedVariable);

  const conditionDropdownOptions =
    conditionsOptions[selectedVariableValue.type];

  const selectedOption = conditionDropdownOptions?.find(
    (option) => option.value === fieldValue?.condition
  );
  const inputFieldValue = processInputFieldValue(selectedOption, fieldValue);
  return (
    <Box
      key={id}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        position: isDragging ? 'static' : 'relative',
        zIndex: isDragging ? 1 : 'unset',
      }}
      display='flex'
      flexDirection='column'
      gap={2}
    >
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        backgroundColor='#CD3C79'
        color='white'
        p='5px 10px'
        rounded='3px'
        boxShadow='rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
        paddingLeft='0'
      >
        <Box display='flex' justifyContent='space-around' alignItems='center'>
          <FormTextField
            placeholder='Click to edit'
            name={`${name}.text`}
            className='button-input'
            value={inputFieldValue || ''}
            readOnly={true}
            autoComplete='off'
            sx={{
              border: 'none',
              outline: 'none',
              height: '14px',
              fontSize: '14px',
            }}
            _active={{
              border: 'none !important',
              outline: 'none !important',
              boxShadow: 'none',
            }}
            _focus={{
              border: 'none !important',
              outline: 'none !important',
              boxShadow: 'none',
            }}
            _placeholder={{
              color: '#ffffff80',
            }}
            cursor='default'
          />
        </Box>

        <Box display='flex' justifyContent='flex-end' alignItems='center'>
          <UiIconButton
            icon={<FaGripVertical />}
            label='Drag'
            {...listeners}
            {...attributes}
            style={{ cursor: 'grab' }}
          />
          <UiIconButton
            icon={<FaGear />}
            label='Settings'
            onClick={handleSettingClick}
          />
          <UiIconButton
            icon={<FaTrashAlt />}
            label='Delete'
            onClick={handleDeleteClick}
          />
        </Box>
      </Box>

      {fieldValue?.isSettingExpand && (
        <RuleSettings
          subFieldName={`${name}`}
          selectedVariable={selectedVariable}
          fieldValue={fieldValue}
          handleFieldItemPropChange={(changesValues) => {
            handleFieldItemPropChange(changesValues);
          }}
        />
      )}
    </Box>
  );
}

export { RuleInputField };
