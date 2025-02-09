import { Divider, Flex, Text } from '@chakra-ui/react';
import {
  FormCheckbox,
  FormSettings,
  FormTextField,
} from '../../../Shared/FormUi';

import React from 'react';
import { FormNodePortal } from './FormNodePortal';

export function FormNodeSettings({ setActiveSidebar, activeSidebar }) {
  return (
    <Flex gap={3} direction='column'>
      <Divider />
      <Flex justifyContent='space-between' alignItems='center'>
        <Text fontSize='large' fontWeight='700'>
          Settings
        </Text>
        <FormNodePortal
          isCard={false}
          type='settings'
          activeSidebar={activeSidebar}
          setActiveSidebar={setActiveSidebar}
          contentKey='setting'
        />
      </Flex>
    </Flex>
  );
}
export function NodeSettingsPortalContent() {
  return (
    <>
      <FormTextField
        name='sendLabel'
        label='Submit button label'
        variant='custom'
        labelVariant='h3'
      />
      <Divider />
      <FormSettings
        label='Skip button'
        name='hasSkipButton'
        bgColor='inherit'
        containerStyles={{ padding: 0 }}
        labelVariant='h3'
        labelProps={{ style: { cursor: 'pointer' } }}
      >
        <FormTextField
          name='skipLabel'
          label='Skip button label'
          variant='custom'
          labelVariant='h3'
        />
      </FormSettings>
      <Divider />
      <FormTextField
        name='extra.errorMessage'
        label='Required field error message'
        variant='custom'
        labelVariant='h3'
      />
      <Divider />
      <FormCheckbox
        name='extra.markRequired'
        label='Mark required fields with a * on the label'
        labelVariant='h3'
      />
      <Divider />
      <FormCheckbox
        name='extra.mobileResponsive'
        label='Stack fields on mobile'
        labelVariant='h3'
      />
    </>
  );
}
