import { Box, Icon, Image } from '@chakra-ui/react';
import { buttonCreatorIcons } from '../../../config/constant';

const ButtonIconContent = ({ buttonStyle, value }) => {
  return (
    <Box display='flex' alignItems='center'>
      {buttonStyle === 'icon' && value?.icon && (
        <Icon as={buttonCreatorIcons[value?.icon]} boxSize={4} marginLeft={2} />
      )}

      {buttonStyle === 'image' && value?.image && (
        <Image src={value?.image} boxSize='32px' marginLeft={2} />
      )}
      {buttonStyle === 'emoji' && value?.emoji && (
        <Box fontSize='16px' marginLeft={2}>
          {value?.emoji}
        </Box>
      )}
    </Box>
  );
};
export default ButtonIconContent;
