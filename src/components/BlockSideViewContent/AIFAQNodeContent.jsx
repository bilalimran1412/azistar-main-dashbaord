import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { fetchWrapper } from '../../utils/fetchWrapper';
import { useFormikContext } from 'formik';
import { Box, Button, FormLabel, HStack, Textarea } from '@chakra-ui/react';
import { FormToggleSwitch } from '../Shared/FormUi';
import { useFetchData } from '../../hooks/bot/useFetchData';
import { useUpdateNodeInternals } from '@xyflow/react';

function AIFAQNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById, setEdges } =
    useNodeContext();
  const updateNodeInternals = useUpdateNodeInternals();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    aiFAQ: currentNode?.data?.params?.aiFAQ || '',
    enableExit: currentNode?.data?.params?.enableExit || '',
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    updateNodeById(id, { params: { ...formValues } });
    if (!formValues?.enableExit) {
      setEdges((edges) => edges.filter((edge) => edge.source !== id));
    }
    updateNodeInternals(id);
    handleClose();
  };

  return (
    <SidebarFormContainer
      block={config}
      onClose={handleClose}
      onFormSave={onSave}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onReset={handleClose}
    >
      <TextInputComponent />
      <FormToggleSwitch
        label='Enable an exit to this block'
        name='enableExit'
        labelVariant='h3'
      />
    </SidebarFormContainer>
  );
}

export default AIFAQNodeContent;

const TextInputComponent = () => {
  const [inputText, setInputText] = React.useState('');
  const { values, setFieldValue } = useFormikContext();
  const [isSending, setIsSending] = React.useState(false);

  const {
    data: aiFAQResponse,
    enableFetch,
    setEnableFetch,
  } = useFetchData(`/auth/integration/prompt/${values?.aiFAQ}`, false);

  React.useEffect(() => {
    if (values?.aiFAQ && !enableFetch) {
      setEnableFetch(true);
    }
  }, [enableFetch, setEnableFetch, values?.aiFAQ]);

  React.useEffect(() => {
    if (aiFAQResponse?.data?.[0]?.prompt) {
      setInputText(aiFAQResponse?.data?.[0]?.prompt);
    }
  }, [aiFAQResponse?.data, aiFAQResponse?.data.prompt, setFieldValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 50000) {
      setInputText(value);
    }
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      try {
        setIsSending(true);
        const response = await fetchWrapper({
          url: '/auth/integration/prompt',
          method: 'POST',
          body: { prompt: inputText },
        });
        if (response?.data) {
          setFieldValue('aiFAQ', response?.data._id);
        }
        setInputText('');
      } catch (err) {
        console.error('Error sending text:', err);
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleClearInput = () => {
    setInputText('');
  };

  return (
    <Box width='100%'>
      <FormLabel variant='h2'>
        Paste the info that  will rely on when answering questions
      </FormLabel>
      <Textarea
        value={inputText}
        onChange={handleChange}
        placeholder='Located in the heart of Barcelona, our restaurant brings together a fusion of international flavors influenced by Italian, Mexican, and Asian cuisines. We pride ourselves in offering a diverse range of vegetarian and vegan dishes to accommodate various dietary preferences. For reservations, please call us at 5550123. Families are warmly welcomed, and we provide a dedicated kids menu along with high chairs for the little ones. Our staff is well-trained to cater to special dietary needs. If you are interested in hosting a private event, please contact us directly...'
        size='md'
        resize='none'
        minHeight='350px'
        maxLength={50000}
        variant='outline'
      />
      <HStack justifyContent='space-between' mt={4}>
        <Button
          colorScheme='blue'
          onClick={handleSend}
          isDisabled={!inputText.trim() || isSending}
          isLoading={isSending}
        >
          Send
        </Button>
        {inputText && (
          <Button
            colorScheme='red'
            onClick={handleClearInput}
            variant='outline'
          >
            Clear
          </Button>
        )}
      </HStack>
    </Box>
  );
};
