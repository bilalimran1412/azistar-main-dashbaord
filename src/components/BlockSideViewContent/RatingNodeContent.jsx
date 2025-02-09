import React from 'react';
import { Divider } from '@chakra-ui/react';
import { DraftEditorField, FormDropdown } from '../Shared/FormUi';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormVariableSelectorDropdown from '../Shared/FormUi/FormVariableSelectorDropdown';
import { seedID } from '../../utils';

const dropdownOptions = [
  { value: 'star-3', label: '⭐️⭐️⭐️' },
  { value: 'star-5', label: '⭐️⭐️⭐️⭐️⭐' },
  { value: 'star-10', label: '⭐️⭐️⭐⭐️⭐️⭐️⭐⭐️⭐️⭐️' },
  { value: 'mood', label: '😡 🙁 😐 🙂 😍' },
];
const splitEmojiString = (str) =>
  (
    str.match(
      /(\p{Emoji_Presentation}|\p{Emoji_Modifier_Base}|\p{Emoji_Component}|\p{Emoji_Modifier})/gu
    ) || []
  ).filter((char) => char.trim() !== '' && char !== '\uFE0F');

function RatingNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;

  const initialValues = {
    //this message will contain all the ops and html and normal text
    message: currentNode?.data?.params?.message || {
      text: config.fields.placeholder,
    },
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,

    variable:
      currentNode?.data?.params?.variable || config.data?.params?.variable,
    rating: currentNode?.data?.params?.rating || config.data?.params?.rating,
  };
  const validationSchema = yup.object({
    rating: yup.string().required('Rating is required.'),
  });

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const variableName = formValues.variable.value;
    const ratingValue = formValues?.rating;
    const rating = dropdownOptions.find(
      (option) => option.value === ratingValue
    );

    const buttons = splitEmojiString(rating.label).map((char) => ({
      id: seedID(),
      text: char,
    }));
    updateNodeById(id, { params: { ...formValues, variableName, buttons } });
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
      <DraftEditorField
        name='message'
        placeholder={config.fields.placeholder}
        label={config.fields.label}
        setNodeContent={true}
        labelVariant='h1'
      />

      <Divider />
      <FormDropdown name='rating' options={dropdownOptions} variant='custom' />
      <Divider />
      <FormVariableSelectorDropdown
        allowedType={config?.variableType}
        name='variable'
      />
    </SidebarFormContainer>
  );
}

export default RatingNodeContent;
