import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Icon,
  Text,
  Flex,
  Image,
} from '@chakra-ui/react';
import { FaLink, FaPaperclip, FaVideo } from 'react-icons/fa';
import { getYoutubeThumbnail } from '../../../utils';
import GiphySearchTabPanel from './GiphyPanel';

function MediaSelectModal({
  isOpen,
  onClose,
  onSaveAction,
  onFileSelect,
  showVideoTab = false,
}) {
  const [url, setUrl] = useState('');
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleSave = () => {
    onSaveAction(activeTabIndex, url);
    onClose();
  };
  const handleTabChange = (index) => {
    setActiveTabIndex(index);
    setUrl('');
  };

  const handleSelect = (gifItem) => {
    const gifUrl = gifItem.images.original.url;
    console.log(gifItem);
    setUrl(gifUrl);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='left'>Select media</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Tabs index={activeTabIndex} onChange={handleTabChange}>
              <TabList>
                <Tab>Upload</Tab>
                <Tab>Upload via URL</Tab>
                <Tab>Search</Tab>
                {showVideoTab && <Tab>Video Embed</Tab>}
              </TabList>

              <TabPanels>
                <TabPanel display='flex' flexDirection='column' p={10} gap={10}>
                  <Flex
                    alignItems='center'
                    justifyContent='center'
                    direction='column'
                    gap={3}
                  >
                    <Icon as={FaPaperclip} boxSize={12} mr={2} />
                    <Text fontSize='lg'>Upload your file</Text>
                  </Flex>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      height: '40px',
                      border: '1px solid lightgray',
                      borderRadius: '4px',
                      position: 'relative',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      padding: '0 12px',
                    }}
                  >
                    <Input
                      type='file'
                      accept='image/*'
                      display='none'
                      onChange={onFileSelect}
                    />
                    <Text flex='1' textAlign='center' color='gray.600'>
                      Choose file....
                    </Text>
                  </label>
                </TabPanel>

                <TabPanel display='flex' flexDirection='column' p={10} gap={10}>
                  <Flex
                    alignItems='center'
                    justifyContent='center'
                    direction='column'
                    gap={3}
                  >
                    <Icon as={FaLink} boxSize={12} mr={2} />
                    <Text fontSize='lg'>Enter URL</Text>
                  </Flex>
                  <Input
                    placeholder='https://'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    variant='custom'
                  />
                </TabPanel>
                <TabPanel display='flex' flexDirection='column' p={10} gap={10}>
                  <GiphySearchTabPanel onSelect={handleSelect} />
                </TabPanel>
                {/* 

                <TabPanel display='flex' flexDirection='column' p={10} gap={10}>
                  <Flex direction='column' gap={3} minH={'120px'}>
                    <Input
                      placeholder='Enter text'
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </Flex>
                </TabPanel> */}

                {showVideoTab && (
                  <TabPanel
                    display='flex'
                    flexDirection='column'
                    p={10}
                    gap={10}
                  >
                    <Flex
                      alignItems='center'
                      justifyContent='center'
                      direction='column'
                      gap={3}
                    >
                      {url ? (
                        <Image src={url} width='220px' height={'120px'} />
                      ) : (
                        <>
                          <Icon as={FaVideo} boxSize={12} mr={2} />
                          <Text fontSize='lg'>
                            Enter a valid Youtube, Vimeo or Wistia URL
                          </Text>
                        </>
                      )}
                    </Flex>
                    <Input
                      placeholder='https://'
                      // value={url}
                      onChange={(e) =>
                        setUrl(getYoutubeThumbnail(e.target.value))
                      }
                    />
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' ml={3} onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default MediaSelectModal;
