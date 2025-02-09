import React, { useState } from 'react';

import {
  Box,
  Input,
  Button,
  List,
  ListItem,
  Text,
  VStack,
  useOutsideClick,
  Icon,
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { useFetchData } from '../../hooks/bot/useFetchData';
import { fetchWrapper } from '../../utils/fetchWrapper';
import { useFormikContext } from 'formik';

function GoalNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    goalID: currentNode?.data?.params?.goal || '',
    goalName: currentNode?.data?.params?.goalName || '',
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const nodeTextContent = formValues?.goalName;
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
      <Text
        style={{
          fontWeight: '700',
        }}
      >
        Name your goal
      </Text>
      <GoalDropdown />
    </SidebarFormContainer>
  );
}

export default GoalNodeContent;

const GoalDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [goals, setGoals] = useState([]);
  const { values, setFieldValue } = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: () => setIsOpen(false),
  });

  const { data: goalList, loading, refetch } = useFetchData('/goal');

  React.useEffect(() => {
    if (goalList?.data && !loading) {
      setGoals(goalList.data);
    }
  }, [goalList, loading]);
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const matches = goals?.filter((goal) =>
        goal?.value?.toLowerCase()?.includes(value.toLowerCase())
      );

      setShowCreate(matches.length === 0 && value.trim() !== '');

      setIsOpen(true);
    }
  };

  const handleCreateNew = async () => {
    if (searchTerm.trim()) {
      try {
        setShowCreate(false);
        setIsOpen(false);
        const response = await fetchWrapper({
          url: '/goal',
          method: 'POST',
          body: { value: searchTerm },
        });
        if (response?.data) {
          setFieldValue('goalName', response?.data.value);
          setFieldValue('goalID', response?.data._id);
        }
        await refetch();

        setSearchTerm('');
      } catch (err) {
        console.error('Error creating goal:', err);
      }
    }
  };

  const handleSelectGoal = (goal) => {
    setSearchTerm('');
    setIsOpen(false);
    setFieldValue('goalName', goal?.value);
    setFieldValue('goalID', goal?._id);
  };

  const handleRemoveSelectedGoal = () => {
    setFieldValue('goalName', '');
    setFieldValue('goalID', '');
  };

  return (
    <Box position='relative' width='100%' ref={ref}>
      <>
        {values?.goalName ? (
          <HStack spacing={2} mt={2}>
            <Tag size='lg' borderRadius='full' variant='solid'>
              <TagLabel>{values?.goalName}</TagLabel>
              <TagCloseButton onClick={handleRemoveSelectedGoal} />
            </Tag>
          </HStack>
        ) : (
          <>
            <Input
              placeholder='e.g. Email collected'
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => setIsOpen(true)}
              variant='custom'
            />

            {isOpen && (
              <Box
                border='1px solid #e2e8f0'
                boxShadow='sm'
                borderRadius='md'
                bg='white'
                mt={2}
                position='absolute'
                width='100%'
                zIndex='dropdown'
              >
                <VStack align='start' spacing={2} p={2}>
                  <Button
                    leftIcon={<Icon as={FiPlus} />}
                    size='sm'
                    onClick={handleCreateNew}
                    width='100%'
                    isDisabled={!showCreate}
                  >
                    Create a new Goal
                  </Button>

                  {goals.length > 0 && (
                    <List spacing={1} width='100%'>
                      {goals
                        .filter((goal) =>
                          goal?.value
                            ?.toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                        .map((goal) => (
                          <ListItem
                            key={goal?._id}
                            cursor='pointer'
                            onClick={() => handleSelectGoal(goal)}
                            _hover={{ bg: 'gray.100' }}
                            padding='4px 8px'
                          >
                            <Text>{goal?.value}</Text>
                          </ListItem>
                        ))}
                    </List>
                  )}
                </VStack>
              </Box>
            )}
          </>
        )}
      </>
    </Box>
  );
};
