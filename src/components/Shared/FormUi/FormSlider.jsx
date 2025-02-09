import React from 'react';
import { useField } from 'formik';
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  FormControl,
  FormLabel,
  Badge,
  Box,
} from '@chakra-ui/react';

const FormSlider = ({ name, label, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const sliderValue = field.value || 0;

  return (
    <FormControl>
      <FormLabel htmlFor={name} variant='h2'>
        {label}
      </FormLabel>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <Badge colorScheme='teal'>A: {Math.round(sliderValue)}%</Badge>
        <Badge colorScheme='teal'>B: {100 - Math.round(sliderValue)}%</Badge>
      </Box>
      <Slider
        id={name}
        value={sliderValue}
        defaultValue={field.value}
        min={0}
        max={100}
        colorScheme='teal'
        onChange={(v) => helpers.setValue(v)}
        {...props}
      >
        <SliderMark value={20} mt='1' ml='-2.5' fontSize='sm'>
          20
        </SliderMark>
        <SliderMark value={40} mt='1' ml='-2.5' fontSize='sm'>
          40
        </SliderMark>
        <SliderMark value={60} mt='1' ml='-2.5' fontSize='sm'>
          60
        </SliderMark>
        <SliderMark value={80} mt='1' ml='-2.5' fontSize='sm'>
          80
        </SliderMark>
        <SliderMark value={100} mt='1' ml='-2.5' fontSize='sm'>
          100
        </SliderMark>

        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg='teal.500'
          color='white'
          placement='top'
          isOpen={sliderValue !== 0}
          label={`${sliderValue}`}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </FormControl>
  );
};

export default FormSlider;
