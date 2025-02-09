import {
  AzistarForm,
  FormTextField,
  ParamsFieldArray,
} from '../../FormUi';
import { CustomModal } from '../../UiComponents';
import { yup } from '../../../../utils/yup';
import { Box, Button, FormLabel } from '@chakra-ui/react';
import React from 'react';
import { useMutation } from 'hooks/bot/useMutation';

function WebhookDomainModal({ onClose, isOpen }) {
  const { mutate, loading } = useMutation('/auth/integration', 'POST');

  const initialValues = {
    name: '',
    domain: '',
    headers: [
      { key: '', value: '', id: 'bb1a3e97-9735-5c82-90f4-bc5d39520540' },
    ],
  };
  const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    domain: yup.string().required('Domain is required'),
  });

  const onSave = async (formValues) => {
    console.log('Form values=>>>', formValues);
    const headers = formValues?.headers?.filter((header) => header.key);

    await mutate({
      service: 'webhook',
      auth: {
        name: formValues.name,
        headers: headers,
        domain: formValues.domain,
      },
    });
    onClose();
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      title='New domain variable'
      footer={
        <>
          <Box
            m={6}
            mb={2}
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            gap={3}
          >
            <Button
              variant='outline'
              colorScheme='blue'
              type='reset'
              form='domainVariables'
              onClick={onClose}
              isLoading={loading}
            >
              Close
            </Button>
            <Button
              colorScheme='blue'
              type='submit'
              form='domainVariables'
              isLoading={loading}
            >
              Save
            </Button>
          </Box>
        </>
      }
    >
      <AzistarForm
        onSave={onSave}
        validationSchema={validationSchema}
        initialValues={initialValues}
        formID='domainVariables'
      >
        <FormTextField
          name='name'
          label='Name'
          placeholder='Name'
          labelVariant='h3'
          variant='custom'
        />
        <FormTextField
          name='domain'
          label='Domain'
          placeholder='https://'
          labelVariant='h3'
          variant='custom'
        />
        <Box>
          <FormLabel variant='h3'>Custom headers</FormLabel>
          <ParamsFieldArray name='headers' />
        </Box>
      </AzistarForm>
    </CustomModal>
  );
}
export { WebhookDomainModal };
