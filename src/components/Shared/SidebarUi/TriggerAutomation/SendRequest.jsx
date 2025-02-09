import {
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import { CodeEditor, CustomModal } from 'components/Shared/UiComponents';
import { useFormikContext } from 'formik';
import React from 'react';
import { MdFullscreen } from 'react-icons/md';
import { getDropdownOptions } from 'utils/arrayHelper';
import { fetchWrapper } from 'utils/fetchWrapper';
import { getFinalUrl } from 'utils/objectHelpers';

function SendRequest({ type, setDropdownOptions }) {
  const { values } = useFormikContext();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(false);
  const [responseMessage, setResponseMessage] = React.useState(null);
  const [isError, setIsError] = React.useState(false);

  const handleTestRequest = async () => {
    const formTestData = values?.parameters?.reduce((acc, obj) => {
      if (obj.testValue) {
        acc[obj.value] = obj.testValue;
      }
      return acc;
    }, {});
    try {
      setIsLoading(true);
      if (type === 'trigger') {
        const method = 'POST';
        const response = await fetchWrapper({
          url: '/send_request',
          method: 'POST',
          body: {
            url: values?.url,
            data: formTestData,
            method: method,
          },
        });

        if (response?.data) {
          setResponseMessage(response.data);
        }
      } else {
        //type will be here webhook
        const userUrl = getFinalUrl(values);
        const method = values?.method;
        const body = values?.body;
        const headers = values?.headers;
        const customFields = values?.customFields;
        const customBody = values?.customBody;
        const customHeaders = values?.customHeaders;

        const response = await fetchWrapper({
          url: '/send_request',
          method: 'POST',
          body: {
            url: userUrl,
            method: method,
            ...(customFields && { fields: formTestData }),
            ...(customBody && { data: body }),
            ...(customHeaders && { headers: headers }),
          },
        });

        if (response?.data) {
          setResponseMessage(response.data);
          const options = getDropdownOptions(response.data.response.data);
          setDropdownOptions && options && setDropdownOptions(options);
        }
      }
      setIsError(false);
    } catch (err) {
      setResponseMessage('Unable to test the request.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box mt={1}>
      <Button
        my={4}
        colorScheme='blue'
        isLoading={isLoading}
        type='button'
        onClick={handleTestRequest}
      >
        Test webhook trigger
      </Button>

      {isError && (
        <Alert
          status={'error'}
          mt={4}
          display='flex'
          flexDirection='column'
          alignItems='flex-start'
          gap={2}
        >
          <Flex>
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
          </Flex>
          <AlertDescription>{responseMessage}</AlertDescription>
        </Alert>
      )}
      {responseMessage && !isError && (
        <Box display='flex' flexDirection='column' gap={5} mt={3}>
          <Box>
            <FormLabel variant='h3' color='blue'>
              Test status code
            </FormLabel>
            <Input
              value={responseMessage?.response?.status}
              variant='custom'
              readOnly
            />
          </Box>
          <Box>
            <FormLabel variant='h3' color='blue'>
              Test Response Body
            </FormLabel>
            <Box
              position='relative'
              sx={{
                _hover: {
                  '.fullscreen': {
                    visibility: 'visible',
                  },
                },
              }}
            >
              <CodeEditor
                value={responseMessage?.json || ''}
                height='300px'
                theme='dark'
                editable={false}
              />
              <Box
                position='absolute'
                bottom='20px'
                padding={2}
                bgColor='white'
                right='10px'
                visibility='hidden'
                className='fullscreen'
                cursor='pointer'
                onClick={onOpen}
              >
                <MdFullscreen />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {isOpen && (
        <CustomModal
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          size='5xl'
          footer={
            <Box
              m={10}
              mb={2}
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <Button variant='outline' colorScheme='blue' onClick={onClose}>
                Close
              </Button>
            </Box>
          }
        >
          <CodeEditor
            value={responseMessage?.json || ''}
            height='600px'
            theme='dark'
            editable={false}
          />
        </CustomModal>
      )}
    </Box>
  );
}

export { SendRequest };
