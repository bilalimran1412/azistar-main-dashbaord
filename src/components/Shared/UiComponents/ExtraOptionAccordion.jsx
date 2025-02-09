import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

const ExtraOptionsAccordion = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <Accordion allowToggle>
      <AccordionItem style={{ border: 'none' }} marginBottom={4}>
        <h2>
          <AccordionButton
            backgroundColor='inherit'
            padding={0}
            width='min-content'
          >
            <Box
              as='span'
              display='flex'
              alignItems='center'
              onClick={handleToggle}
              cursor='pointer'
              color='white'
              textDecoration={'underline'}
              fontSize='12px'
            >
              <Box as='span' mr={2}>
                Extra options
              </Box>
              <Icon
                as={FaChevronRight}
                transform={isOpen ? 'rotate(270deg)' : 'rotate(90deg)'}
                transition='transform 0.2s'
              />
            </Box>
          </AccordionButton>
        </h2>
        <AccordionPanel p={0} marginTop={2}>
          {children}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export { ExtraOptionsAccordion };
