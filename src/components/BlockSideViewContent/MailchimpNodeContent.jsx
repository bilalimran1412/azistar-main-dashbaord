import React from 'react';
import { Button, Divider, Flex, Text } from '@chakra-ui/react';
import {
  FieldValuesFieldArray,
  FormCheckboxGroup,
  FormDropdown,
  FormVariableSelectorDropdown,
} from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { useFormikContext } from 'formik';

const authOptions = [
  { label: 'Account 1', value: 'acc1' },
  {
    label: 'Account 2',
    value: 'acc2',
  },
];
const interests = [
  {
    label: 'option 1',
    value: '1008502409',
  },
  {
    label: 'option 2',
    value: '2e1305b4d6',
  },
  {
    label: 'option 3',
    value: 'cac16bcfaa',
  },
];

const audCatInt = {
  acc1: {
    interests: {
      c1: interests,
      c2: [
        {
          label: 'Acc1 option1',
          value: 'cac1sdsz6bceds-opt1',
        },
      ],
    },
    audience: [
      {
        label: 'Audience1',
        value: '1',
      },
      {
        label: 'Audience2',
        value: '12',
      },
    ],
    category: [
      {
        label: 'cat 1',
        value: 'c1',
      },
      {
        label: 'cat 2',
        value: 'c2',
      },
    ],
  },
  acc2: {
    interests: {
      ac2c1: [
        {
          label: 'acc2 cat1 option1',
          value: '2e1ds34d6',
        },
        {
          label: 'acc2 cat1 option2',
          value: 'cac1sd6bceds',
        },
      ],
      ac2c2: [
        {
          label: 'ac2 cat 2 option',
          value: 'cac1sdsz6bceds',
        },
      ],
    },
    audience: [
      {
        label: 'acc2 Audience1',
        value: '1acc2',
      },
      {
        label: 'acc2 Audience2',
        value: '12acc2',
      },
    ],
    category: [
      {
        label: 'acc 2cat 1',
        value: 'ac2c1',
      },
      {
        label: 'acc2 cat 2',
        value: 'ac2c2',
      },
    ],
  },
};

const dropdownOptions = [
  {
    label: 'Address',
    value: 'ADDRESS',
  },
  {
    label: 'Birthday',
    value: 'BIRTHDAY',
  },
  {
    label: 'Company',
    value: 'COMPANY',
  },
  {
    label: 'First Name',
    value: 'FNAME',
  },
  {
    label: 'Last Name',
    value: 'LNAME',
  },
  {
    label: 'Phone Number',
    value: 'PHONE',
  },
];
function MailchimpNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const [selectedAuth, setSelectedAuth] = React.useState(null);
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    auth: selectedAuth || currentNode?.data?.params?.auth || '',
    audience: currentNode?.data?.params?.audience || '',
    category: currentNode?.data?.params?.category || '',
    interests: currentNode?.data?.params?.interests || '',
    email: currentNode?.data?.params?.email || '',
    fieldValues: currentNode?.data?.params?.fieldValues || [
      { field: '', id: 'ac2e1be9-fdb7-5e62-abe3-b20b4d2b2bb2' },
    ],
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const fieldValues = formValues?.fieldValues?.filter((value) => value.field);

    updateNodeById(id, { params: { ...formValues, fieldValues } });
    handleClose();
  };
  const onAuthChange = (selectedAuth) => {
    setSelectedAuth(selectedAuth);
  };

  return (
    <SidebarFormContainer
      block={config}
      onClose={handleClose}
      onFormSave={onSave}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onReset={() => {}}
    >
      <Flex gap={2} alignItems='center'>
        <Text>MAILCHIMP ACCOUNT</Text>
        <Button
          minH={0}
          minW={0}
          h='26px'
          paddingX={5}
          borderRadius={0}
          backgroundColor='rgb(215, 55, 107)'
          _hover={{
            backgroundColor: 'rgb(215, 55, 107)',
          }}
        >
          <Text fontSize='12px' textTransform='uppercase' color='white'>
            Add account
          </Text>
        </Button>
      </Flex>

      <DynamicForm onAuthChange={onAuthChange} />
    </SidebarFormContainer>
  );
}

export default MailchimpNodeContent;

function DynamicForm({ onAuthChange }) {
  const { values, resetForm } = useFormikContext();
  const selectedAuth = values?.auth;
  const selectedAudience = values?.audience;
  const selectedCategory = values?.category;

  const optionsObject = audCatInt?.[selectedAuth];

  const _onAuthChange = (value) => {
    onAuthChange(value);
    resetForm();
  };

  return (
    <>
      <FormDropdown
        name='auth'
        variant='custom'
        options={authOptions}
        placeholder='Select/Connect account'
        onChange={_onAuthChange}
      />
      <>
        {selectedAuth && optionsObject?.audience?.length && (
          <>
            <FormDropdown
              name='audience'
              variant='custom'
              options={optionsObject?.audience}
              placeholder='Select the audience'
            />
            {selectedAudience && (
              <>
                <FormDropdown
                  name='category'
                  variant='custom'
                  options={optionsObject?.category}
                  placeholder='Select the category'
                />
                {selectedCategory && (
                  <FormCheckboxGroup
                    label=''
                    name='interests'
                    options={optionsObject?.interests?.[selectedCategory]}
                    labelVariant='h3'
                  />
                )}
                <Divider />
                <FormVariableSelectorDropdown
                  name='email'
                  label='Subscriber email'
                />
                <FieldValuesFieldArray
                  name='fieldValues'
                  dropdownOptions={dropdownOptions}
                />
              </>
            )}
          </>
        )}
      </>
    </>
  );
}
