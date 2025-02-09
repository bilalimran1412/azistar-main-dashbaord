import React from 'react';
import { useField, useFormikContext } from 'formik';
import { FormControl, FormLabel, FormHelperText, Box } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { VariableSizeList as List } from 'react-window';
import { useWindowResize } from 'hooks/common/windowResizer';

const FormReactSelect = ({
  name,
  label,
  options = [],
  placeholder = 'Select',
  containerStyles,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();

  const isError = meta.touched && !!meta.error;

  const handleChange = (selectedOption) => {
    setFieldValue(name, selectedOption ? selectedOption.value : '');
  };

  const chakraStyles = {
    dropdownIndicator: (provided) => ({
      ...provided,
      paddingInline: 'auto !important',
      paddingY: '11px',
      w: '32px',
    }),
    option: (provided) => ({
      ...provided,
      fontSize: '14px',
      whiteSpace: 'normal',
      paddingY: '8px',
    }),
  };

  return (
    <FormControl isInvalid={isError} style={containerStyles}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Box>
        <Select
          id={name}
          options={options}
          placeholder={placeholder}
          name={name}
          onChange={handleChange}
          onBlur={() => helpers.setTouched(true)}
          value={options.find((option) => option.value === field.value) || null}
          variant='custom'
          chakraStyles={chakraStyles}
          components={{ MenuList }}
          {...props}
        />
      </Box>
      {isError && <FormHelperText color='red.500'>{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export { FormReactSelect };

function Row({ data, index, setSize }) {
  const rowRef = React.useRef();

  React.useEffect(() => {
    setSize(index, rowRef.current?.getBoundingClientRect().height || 50);
  }, [setSize, index]);

  return (
    <Box ref={rowRef} style={{ whiteSpace: 'normal' }}>
      {data[index]}
    </Box>
  );
}

function MenuList(props) {
  const listRef = React.useRef();
  const [windowWidth] = useWindowResize();

  const sizeMap = React.useRef({});
  const setSize = React.useCallback((index, size) => {
    sizeMap.current[index] = size;
    listRef.current?.resetAfterIndex(index);
  }, []);
  const getSize = (index) => sizeMap.current[index] || 50;

  React.useEffect(() => {
    listRef.current?.resetAfterIndex(0);
  }, [windowWidth]);

  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset =
    options.indexOf(value) * getSize(options.indexOf(value));

  return (
    <List
      ref={listRef}
      height={maxHeight}
      itemCount={children.length}
      itemSize={getSize}
      style={{
        backgroundColor: 'white',
        border: '1px solid #d3d3d3',
      }}
      initialScrollOffset={initialOffset}
      width='100%'
    >
      {({ index, style }) => (
        <Box
          style={{
            ...style,
            width: '100%',
          }}
        >
          <Row
            data={children}
            index={index}
            setSize={setSize}
            windowWidth={windowWidth}
          />
        </Box>
      )}
    </List>
  );
}
