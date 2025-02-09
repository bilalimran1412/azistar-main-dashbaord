import React, { useState } from 'react';
import {
  Button,
  Text,
  Spinner,
  VStack,
  Alert,
  AlertIcon,
  useDisclosure,
} from '@chakra-ui/react';
import { fetchWrapper } from '../../utils/fetchWrapper';
import { useFetchData } from '../../hooks/bot/useFetchData';
import BotList from './BotList';
import CreateBot from './CreateBot';
import { initialNode } from '../../config/constant';

function MainAppLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newBotName, setNewBotName] = useState('');
  const [newBotDescription, setNewBotDescription] = useState('');
  const {
    data: botList,
    loading,
    error,
    setError,
    setLoading,
    refetch,
  } = useFetchData('/bot/list');

  const handleCreateBot = async () => {
    setLoading(true);
    setError(null);

    const diagram = {
      edges: [],
      nodes: [initialNode],
    };
    try {
      await fetchWrapper({
        url: '/bot',
        method: 'POST',
        body: {
          name: newBotName,
          description: newBotDescription,
          diagram: JSON.stringify(diagram),
        },
      });

      await refetch();
      setNewBotName('');
      setNewBotDescription('');
      onClose();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <VStack spacing={4} p={4} align='start'>
      <Button colorScheme='teal' onClick={onOpen}>
        Create New Bot
      </Button>

      {loading && <Spinner size='lg' />}
      {error && (
        <Alert status='error'>
          <AlertIcon />
          <Text>{error.message}</Text>
        </Alert>
      )}
      <BotList botList={botList} />
      <CreateBot
        isOpen={isOpen}
        loading={loading}
        onClose={onClose}
        setNewBotDescription={setNewBotDescription}
        setNewBotName={setNewBotName}
        handleCreateBot={handleCreateBot}
        newBotDescription={newBotDescription}
        newBotName={newBotName}
      />
    </VStack>
  );
}

export default MainAppLayout;
