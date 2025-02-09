import { ButtonGroup } from '@chakra-ui/react';
import {
  FullWidthIcon,
  HalfWidthIcon,
  TwoThirdsLeftIcon,
  TwoThirdsRightIcon,
} from 'components/Shared/SVG';
import { UiIconButton } from 'components/Shared/UiComponents';
import { useField, useFormikContext } from 'formik';

function RowLayout({ subFieldName, rowIndex }) {
  const [field, , helpers] = useField(`${subFieldName}.layout`);
  const { values } = useFormikContext();

  const handleLayoutChange = (value) => {
    helpers.setValue(value);
  };
  const disableFullWidth = values?.rows?.[rowIndex]?.questions?.length > 1;

  return (
    <ButtonGroup isAttached minHeight='0' height='auto'>
      {!disableFullWidth && (
        <UiIconButton
          icon={
            <FullWidthIcon fill={field.value === '1' ? '#3A3D5C' : '#BABBC8'} />
          }
          onClick={() => {
            handleLayoutChange('1');
          }}
          background={field.value === '1' ? '#d2d5da' : 'rgb(229, 231, 235)'}
        />
      )}
      <UiIconButton
        icon={
          <HalfWidthIcon fill={field.value === '1/2' ? '#3A3D5C' : '#BABBC8'} />
        }
        onClick={() => {
          handleLayoutChange('1/2');
        }}
        background={field.value === '1/2' ? '#d2d5da' : 'rgb(229, 231, 235)'}
      />
      <UiIconButton
        icon={
          <TwoThirdsLeftIcon
            fill={field.value === '1/3' ? '#3A3D5C' : '#BABBC8'}
          />
        }
        onClick={() => {
          handleLayoutChange('1/3');
        }}
        background={field.value === '1/3' ? '#d2d5da' : 'rgb(229, 231, 235)'}
      />
      <UiIconButton
        icon={
          <TwoThirdsRightIcon
            fill={field.value === '2/3' ? '#3A3D5C' : '#BABBC8'}
          />
        }
        onClick={() => {
          handleLayoutChange('2/3');
        }}
        background={field.value === '2/3' ? '#d2d5da' : 'rgb(229, 231, 235)'}
      />
    </ButtonGroup>
  );
}

export { RowLayout };
