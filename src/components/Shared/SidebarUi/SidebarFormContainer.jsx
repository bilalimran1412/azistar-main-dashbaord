import React from 'react';
import { Divider, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { AzistarForm } from '../FormUi';
import FormFooter from '../FormUi/FormFooter';
import { FaWindowClose } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SidebarFormContainer({
  children,
  block,
  onFormSave,
  validationSchema,
  initialValues,
  onClose,
  onReset,
}) {
  return (
    <Flex position='relative' direction='column' height='100%' flex={1}>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        width='100%'
        paddingX={3}
        height='60px'
        minHeight='60px'
        paddingY={2}
      >
        <Flex alignItems='center' gap={2}>
          {block?.icon && <Icon fontSize='x-large'>{block.icon}</Icon>}

          <Flex direction='column'>
            <Text as='b' textTransform='uppercase'>
              {block.title}
            </Text>
            <Link
              href='#'
              style={{
                color: 'blue',
              }}
            >
              How to use
            </Link>
          </Flex>
        </Flex>
        <IconButton
          onClick={onClose}
          background='transparent'
          icon={<FaWindowClose />}
        />
      </Flex>
      <Divider />
      <Flex flexDirection='column' flex={1} padding='10px 19px 24px;'>
        <AzistarForm
          onSave={onFormSave}
          validationSchema={validationSchema}
          initialValues={initialValues}
          formID={block.blockId}
          onReset={onReset}
        >
          {children}
        </AzistarForm>
      </Flex>
      <FormFooter form={block.blockId} />
    </Flex>
  );
}

export default SidebarFormContainer;
