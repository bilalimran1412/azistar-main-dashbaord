import React from 'react';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { FaWindowClose } from 'react-icons/fa';
import { UiIconButton } from 'components/Shared/UiComponents';
import { FaGear } from 'react-icons/fa6';

const FixedSidebarPortal = ({
  isCard = true,
  children,
  setActiveSidebar,
  activeSidebar,
  contentKey,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const handleToggle = () => {
    setActiveSidebar(contentKey);
    if (isOpen && contentKey === activeSidebar) {
      onClose();
      return;
    }
    onOpen();
  };
  return (
    <>
      {isCard ? (
        <UiIconButton
          icon={<FaGear />}
          onClick={handleToggle}
          color='lightgray'
          _focus={{ backgroundColor: 'transparent' }}
          _hover={{ backgroundColor: 'transparent' }}
        />
      ) : (
        <UiIconButton
          icon={<FaGear />}
          onClick={handleToggle}
          color='text.default'
          background='#d2d5da'
          _active={{ backgroundColor: '#d2d5da' }}
          _focus={{ backgroundColor: '#d2d5da' }}
        />
      )}
      {isOpen && activeSidebar === contentKey && (
        <Box position='fixed' left='490px' top='0' zIndex='59' bottom='0'>
          <Box
            bg='rgb(248, 248, 248)'
            borderLeft='1px solid rgba(16, 22, 26, 0.15)'
            boxShadow='rgba(16, 22, 26, 0.17) 13px -8px 11px -7px'
            display='flex'
            flexDirection='column'
            height='100%'
            overflowX='hidden'
            overflowY='auto'
            transition='width 0.15s'
            width='400px'
            cursor='initial'
            position='relative'
          >
            <Box display='flex' justifyContent='flex-end' padding='15px 24px'>
              <UiIconButton
                onClick={onClose}
                color='text.default'
                icon={<FaWindowClose />}
              />
            </Box>
            <Box padding='0 15px 24px'>
              <Flex direction='column' gap={5} position='relative'>
                {children}
              </Flex>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export { FixedSidebarPortal };
