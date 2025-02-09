import React from 'react';
import { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

import {
  Button,
  Icon,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,

  Box,
  Flex,
} from '@chakra-ui/react';
import { SidebarFormCard, SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { FaGoogle } from 'react-icons/fa';
import {
  FormDropdown,
  FormVariableSelectorDropdown,
  RowFieldArray,
} from '../Shared/FormUi';

import { useFormikContext } from 'formik';
import { MdClose } from 'react-icons/md';

const options = [
  { label: 'gmailuser@gmail.com', value: '23' },
  { label: 'User1@gmail.com', value: '32' },
];


function GoogleSheetsNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    account: currentNode?.data?.params?.account || '',
    spreadSheet: currentNode?.data?.params?.spreadSheet || '',
    sheet: currentNode?.data?.params?.sheet || '',
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    updateNodeById(id, { params: { ...formValues } });
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
      <AccordionContent />
      <ActionFormFields />

    </SidebarFormContainer>
  );
}

export default GoogleSheetsNodeContent;

function AccordionContent() {

  const [userEmail, setUserEmail] = useState('');
  const [accessToken, setAccessToken] = useState(null);
  const [spreadSheets, setSpreadSheets] = useState([]); // Store sheets in state here
  const [options, setOptions] = useState([]);
  const clientId = "874147798900-6motjarp1i5jgncc9deelnltib500ihv.apps.googleusercontent.com";

  const handleLoginSuccess = (response) => {
    const googletoken = response.credential;
    const decodedToken = googletoken;
    console.log(response);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      alert('Token expired. Please log in again.');
      return true;
    } else {
      console.log('Token is valid');
    }

    // Set user email and token
    setUserEmail(decodedToken.email);
    setOptions([{ label: decodedToken.email, value: decodedToken.email }]);
    setAccessToken(googletoken);
    localStorage.setItem('google_token', googletoken);

  };



  return (
    <Accordion
      allowToggle
      defaultIndex={0}
      style={{
        marginTop: '-10px',
      }}
      marginX='-19px'
    >
      <AccordionItem border='none'>
        <h2>
          <AccordionButton backgroundColor='rgba(0, 0, 0, 0.04)'>
            <Box flex='1' textAlign='left'>
              <Text>Create Account or File</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>


        <AccordionPanel pb={4}>
          <Flex direction='column' gap={8}>
            <SidebarFormCard
              title='Log into your account'
              containerProps={{ padding: 4 }}
              contentContainerProps={{ marginTop: 1 }}
            >
              <Box display='flex' flexDirection='column' gap={2}>
                <Text>Login with google to access your files.</Text>
                <Button
                  // leftIcon={<Icon as={FaGoogle} />}
                  variant='outline'
                  width='full'
                  maxW='md'
                  borderColor='gray.300'
                  _hover={{ bg: 'gray.100', boxShadow: 'md' }}
                  _active={{ bg: 'gray.200' }}
                  backgroundColor={'#fff'}
                  size='lg'
                  height='40px'
                  justifyContent='flex-start'
                >
                  <Text
                    fontSize='14px'
                    fontFamily='Roboto, arial, sans-serif'
                    flex={1}
                  >
                    <GoogleOAuthProvider clientId={clientId}>
                      <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={(error) => console.log('Login failed', error)}
                        scope='https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets.readonly'
                        />
                    </GoogleOAuthProvider>

                    {/* Login with Google */}
                  </Text>
                </Button>
                <FormDropdown
                  name='account'
                  options={options}
                  label=''
                  labelVariant='h3'
                  variant='custom'
                />
              </Box>
            </SidebarFormCard>
            <SidebarFormCard
              title='Select Spreadsheet'
              containerProps={{ padding: 4 }}
              contentContainerProps={{ marginTop: 1 }}
            >
              <SelectFileContent accessToken={accessToken} setSpreadSheets={setSpreadSheets} spreadSheets={spreadSheets} />
            </SidebarFormCard>
          </Flex>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

function SelectFileContent({ accessToken, setSpreadSheets, spreadSheets }) {
  const { values, setFieldValue } = useFormikContext();

  // const setFile = () => {
  //   setFieldValue('spreadSheet', 'sample-spreadsheet.xlsx');
  // };

  const [isFetching, setIsFetching] = useState(false);

  const selectFile = async () => {
    if (!accessToken) {
      alert("You need to log in first.");
      return;
    }
  
    console.log("Access Token:", accessToken);
    setIsFetching(true);
  
    try {
      let nextPageToken = null;
      let allFiles = [];
  
      do {
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files?q=mimeType%3D'application%2Fvnd.google-apps.spreadsheet'&pageToken=${nextPageToken || ''}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
  
        const data = await response.json();
        if (data.files) {
          allFiles = [
            ...allFiles,
            ...data.files.map((file) => ({
              label: file.name,
              value: file.id,
            })),
          ];
        }
        console.log(data)
  
        nextPageToken = data.nextPageToken;
      } while (nextPageToken);
  
      if (allFiles.length > 0) {
        setFieldValue('spreadSheet', allFiles[0].value);
        setSpreadSheets(allFiles);
        console.log("Available Sheets:", allFiles);
      } else {
        alert('No Google Sheet found in your Drive.');
      }
    } catch (error) {
      console.error("Error fetching Google Sheets:", error);
      alert('Failed to fetch Google Sheets. Please try again later.');
    } finally {
      setIsFetching(false);
    }
  };
  




  const clearValue = () => {
    setFieldValue('spreadSheet', '');
    setFieldValue('sheet', '');
  };

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Text>Select a file to save or obtain data.</Text>
      <Flex gap={2} alignItems='center'>
        <Button
          variant='outline'
          width='full'
          maxW='md'
          borderColor='gray.300'
          _hover={{ bg: 'gray.100', boxShadow: 'md' }}
          _active={{ bg: 'gray.200' }}
          backgroundColor={'#fff'}
          size='lg'
          height='40px'
          onClick={selectFile}
          isLoading={isFetching}
        >
          <Text fontSize='14px' fontFamily='Roboto, arial, sans-serif' flex={1}>
            {values?.spreadSheet ? 'File Selected' : 'Select file'}
          </Text>
        </Button>
        {values?.spreadSheet && (
          <Icon
            as={MdClose}
            width='22px'
            onClick={clearValue}
            cursor='pointer'
          />
        )}
      </Flex>
      {spreadSheets.length > 0 && values?.spreadSheet && (
        <FormDropdown
          name='sheet'
          options={spreadSheets}
          label='Select a Sheet'
          labelVariant='h3'
          variant='custom'
          value={values?.sheet}
          onChange={(e) => setFieldValue('sheet', e.target.value)}
        />
      )}
    </Box>
  );
}



function ActionFormFields() {
  const { values } = useFormikContext();
  if (!values.sheet) {
    return <></>;
  }
  return (
    <>
      <SidebarFormCard
        title='Action to perform'
        containerProps={{ padding: 4 }}
        contentContainerProps={{ marginTop: 1 }}
      >
        <FormDropdown
          name='action'
          options={options}
          label=''
          labelVariant='h3'
          variant='custom'
        />
      </SidebarFormCard>

      <SidebarFormCard
        title='Set a reference column'
        containerProps={{ padding: 4 }}
        contentContainerProps={{ marginTop: 1 }}
      >
        <Text mb={2}>
          Select a reference column and its related field to identify which row
          to update.
        </Text>
        <Box bg='#8a9ba826' borderRadius='3px' p='10px 12px 9px'>
          <Flex direction='column' width='100%' alignItems='flex-end'>
            <Box width='100%'>
              <FormDropdown
                label=''
                placeholder='Select the field'
                name={`field`}
                options={[]}
                variant='custom'
              />
              <FormVariableSelectorDropdown
                name={`variable`}
                placeholder='Select a variable'
                label=''
              />
            </Box>
          </Flex>
        </Box>
      </SidebarFormCard>

      <SidebarFormCard
        title='New row'
        containerProps={{ padding: 4 }}
        contentContainerProps={{ marginTop: 1 }}
      >
        <Text mb={2}>
          Specify which fields should be sent to the file and assign them to
          specific columns.
        </Text>
        <RowFieldArray />
      </SidebarFormCard>
    </>
  );
}
