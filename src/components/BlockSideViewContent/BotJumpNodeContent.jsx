import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import {
  Button,
  List,
  ListItem,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FormCustomOptionSelector,
  FormTextField,
} from '../Shared/FormUi';
import { useFormikContext } from 'formik';
import { CustomModal } from '../Shared/UiComponents';
import { useFetchData } from '../../hooks/bot/useFetchData';
const options = [
  { label: 'No', value: false },
  { label: 'Yes', value: true },
];
function BotJumpNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };

  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    botID: currentNode?.data?.params?.botID || '',
    nodeID: currentNode?.data?.params?.nodeID || '',
    specificEnabled: currentNode?.data?.params?.specificEnabled || false,
    botName: currentNode?.data?.params?.botName || '',
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    const nodeTextContent = formValues.botName;
    updateNodeById(id, {
      params: { ...formValues, ...(nodeTextContent && { nodeTextContent }) },
    });
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
      <Text fontWeight='500'>
        Select a bot you want to Jump To. You can point to a specific block,
        otherwise, it will jump to the starting point.
      </Text>
      <SelectBlockButton />
      <FormCustomOptionSelector
        label='Point to a specific block'
        name='specificEnabled'
        options={options}
        labelVariant='h3'
      />
      <BlockIdInput />
    </SidebarFormContainer>
  );
}

export default BotJumpNodeContent;
function SelectBlockButton() {
  const { values, setFieldValue } = useFormikContext();
  const [selectedItem, setSelectedItem] = React.useState(null);

  const { onOpen, isOpen, onClose } = useDisclosure();
  const handleSave = () => {
    if (selectedItem) {
      setFieldValue('botName', selectedItem?.name);
      setFieldValue('botID', selectedItem?._id);
    }
    onClose();
  };

  return (
    <>
      <Button
        height='40px'
        textTransform='uppercase'
        border='0'
        boxShadow='none !important'
        textAlign='center'
        fontWeight='700'
        letterSpacing='0px'
        fontSize='12px'
        borderRadius='4px'
        backgroundColor='#e0e1ec !important'
        color='#45496e'
        onClick={onOpen}
      >
        {values?.botName ? values?.botName : 'Select bot'}
      </Button>
      {isOpen && (
        <CustomModal
          isOpen={isOpen}
          onClose={onClose}
          onSave={handleSave}
          title='Select bot'
          isCentered={true}
        >
          <SelectBotModalContent
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        </CustomModal>
      )}
    </>
  );
}
function BlockIdInput() {
  const { values } = useFormikContext();
  return (
    <>
      {values.specificEnabled && (
        <>
          <Text>
            To point to a specific block, paste the block ID below. You can find
            it by clicking on the block's menu, then on "Copy block ID".
          </Text>
          <FormTextField
            name='nodeID'
            placeholder='Paste Block ID'
            label={''}
            variant='custom'
          />
        </>
      )}
    </>
  );
}

function SelectBotModalContent({ selectedItem, setSelectedItem }) {
  const { data: botList, loading, error } = useFetchData('/bot/list');

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  if (loading) {
    return <Spinner size='lg' />;
  }
  if (error) {
    return <Text>Unable to fetch</Text>;
  }
  return (
    <List>
      {botList?.data.map((item, index) => (
        <ListItem
          key={item?._id}
          display='flex'
          alignItems='center'
          padding='10px 5px'
          width='100%'
          cursor='pointer'
          backgroundColor={
            selectedItem?._id === item?._id ? 'blue.500' : 'transparent'
          }
          color={selectedItem?._id === item?._id ? 'white' : 'black'}
          _hover={{
            backgroundColor: 'blue.100',
            color: selectedItem?._id === item?._id ? 'black' : 'white',
          }}
          onClick={() => handleSelect(item)}
        >
          {item?.name}
        </ListItem>
      ))}
    </List>
  );
}
