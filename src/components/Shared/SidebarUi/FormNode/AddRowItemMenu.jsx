import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Text,
  Icon,
} from '@chakra-ui/react';
import { AddItemRoundButton } from 'components/Shared/UiComponents';
import { questionTypes } from './data';

const RowAddItemMenu = ({ onAddQuestion }) => {
  return (
    <Menu>
      <MenuButton type='button'>
        <AddItemRoundButton />
      </MenuButton>
      <MenuList
        backgroundColor='#45496e'
        color='#fff'
        overflow='visible'
        position='relative'
      >
        <Box height='230px' width='270px' overflow='auto'>
          {questionTypes.map((item, ind) => (
            <MenuItem
              background='#45496e'
              color='#fff'
              minH='40px'
              paddingX={4}
              paddingY={1}
              width='100%'
              _hover={{
                backgroundColor: '#ffffff14',
              }}
              key={ind}
              onClick={() => {
                onAddQuestion(item.layoutType);
              }}
            >
              <Box
                as='span'
                display='inline-flex'
                mr={3}
                border='1px solid gray'
                p={2}
                borderRadius='3px'
              >
                <Icon as={item.icon} width={5} height={5} />
              </Box>
              <Box width='100%'>
                <Text
                  fontWeight='500'
                  fontSize='small'
                  textTransform='uppercase'
                >
                  {item.title}
                </Text>
                <Text fontSize='xsmall' fontWeight='300'>
                  {item.label}
                </Text>
              </Box>
            </MenuItem>
          ))}
        </Box>
      </MenuList>
    </Menu>
  );
};

export { RowAddItemMenu };
