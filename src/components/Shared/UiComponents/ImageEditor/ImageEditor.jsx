import React from 'react';
import Cropper from 'react-easy-crop';
import {
  Box,
  Flex,
  Slider,
  IconButton,
  Button,
  ModalFooter,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

import getCroppedImg from './utils';
const MAX_ZOOM = 3;
const MIN_ZOOM = 1;
const STEP = 0.1;

const ImageEditor = ({ onClose, imageSrc, getCroppedImage }) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

  const onCropComplete = React.useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const isZoomMax = React.useMemo(() => zoom >= MAX_ZOOM, [zoom]);
  const isZoomMin = React.useMemo(() => zoom <= MIN_ZOOM, [zoom]);

  const handleZoomIncrease = React.useCallback(() => {
    if (!isZoomMax) setZoom((prevZoom) => prevZoom + STEP);
  }, [isZoomMax]);

  const handleZoomDecrease = React.useCallback(() => {
    if (!isZoomMin) setZoom((prevZoom) => prevZoom - STEP);
  }, [isZoomMin]);

  const handleSave = React.useCallback(async () => {
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    if (croppedImage) {
      getCroppedImage &&
        getCroppedImage(
          croppedImage.croppedImageFile,
          croppedImage.croppedImageSrcURL
        );
    }
    onClose();
  }, [imageSrc, croppedAreaPixels, getCroppedImage, onClose]);

  const handleCancel = React.useCallback(() => {
    onClose();
    getCroppedImage && getCroppedImage(null, '');
  }, [onClose, getCroppedImage]);

  return (
    <>
      <Flex direction='column' height='450px' width='100%' position='relative'>
        <Box position='absolute' bottom='100px' top={0} left={0} right={0}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
            aspect={1 / 1}
          />
        </Box>

        <Box
          position='absolute'
          height={20}
          bottom='0'
          bg='#FFF'
          width='100%'
          padding='10px'
        >
          <Flex
            alignItems='center'
            justifyContent='space-between'
            gap={4}
            width='100%'
          >
            <IconButton
              onClick={handleZoomDecrease}
              isDisabled={isZoomMin}
              icon={<MinusIcon />}
              aria-label='Decrease Zoom'
            />

            <Slider
              value={zoom}
              min={MIN_ZOOM}
              max={MAX_ZOOM}
              step={STEP}
              aria-label='Zoom'
              onChange={(val) => setZoom(val)}
              flex='1'
              mx={4}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>

            <IconButton
              onClick={handleZoomIncrease}
              isDisabled={isZoomMax}
              icon={<AddIcon />}
              aria-label='Increase Zoom'
            />
          </Flex>
        </Box>
      </Flex>
      <ModalFooter>
        <Button variant='ghost' onClick={handleCancel}>
          Cancel
        </Button>
        <Button colorScheme='blue' ml={3} onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
    </>
  );
};

export default ImageEditor;
