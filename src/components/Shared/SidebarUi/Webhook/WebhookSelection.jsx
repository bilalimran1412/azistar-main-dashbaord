import React, { useState } from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Input,
  List,
  ListItem,
  Spinner,
  Box,
  PopoverCloseButton,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useFetchData } from '../../../../hooks/bot/useFetchData';

const WebhookSelection = ({ onSelect }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [listData, setListData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: webhookList,
    loading: isLoading,
    error,
    setEnableFetch,
  } = useFetchData('/auth/integration/webhook', false);

  React.useEffect(() => {
    if (webhookList?.data && !isLoading) {
      const webhooks = webhookList?.data?.map((listItem) => ({
        name: listItem?.auth?.name,
        id: listItem?._id,
        domain: listItem?.auth?.domain,
      }));
      setListData(webhooks);
      setFilteredData(webhooks);
    }
  }, [isLoading, webhookList?.data]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = listData.filter((item) =>
      item?.name?.toLowerCase().includes(searchValue)
    );
    setFilteredData(filtered);
  };

  const onDomainClick = (domain) => {
    onSelect && onSelect(domain);
    onClose();
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => {
        onOpen();
        setEnableFetch(true);
      }}
      onClose={() => {
        onClose();
        setEnableFetch(false);
      }}
    >
      <PopoverTrigger>
        <Button colorScheme='blue' onClick={onOpen}>
          Domain Variables
        </Button>
      </PopoverTrigger>
      <PopoverContent w='300px'>
        <PopoverCloseButton />
        <PopoverHeader>Select Domain</PopoverHeader>
        <PopoverBody>
          <Input
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearch}
            mb={4}
          />
          {isLoading ? (
            <Box textAlign='center'>
              <Spinner />
            </Box>
          ) : error ? (
            <Box color='red.500' textAlign='center'>
              <Text>Unable fetch Domain variables</Text>
            </Box>
          ) : (
            <List spacing={2}>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <ListItem
                    key={index}
                    p={2}
                    bg='gray.100'
                    borderRadius='3px'
                    cursor='pointer'
                    _hover={{ bg: 'gray.200' }}
                    onClick={() => {
                      onDomainClick(item);
                    }}
                  >
                    {item.name}
                  </ListItem>
                ))
              ) : (
                <Box color='gray.500' textAlign='center'>
                  No items found.
                </Box>
              )}
            </List>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export { WebhookSelection };
