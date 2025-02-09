import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import { groupBy } from '../../utils/arrayHelper';
import { MessageFieldArray } from '../Shared/FormUi';
import { messageFieldArrayInitialValue } from '../Shared/FormUi/FormHelper/MessageFieldArray';

function MessageMediaNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];

  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);

  const initialValues = {
    // fields: config.fields,
    mediaAndMessage:
      currentNode?.data?.params?.mediaAndMessage ||
      messageFieldArrayInitialValue?.[config?.data?.initialItem],
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const groupedValues = groupBy(formValues.mediaAndMessage, 'type');

    updateNodeById(id, {
      params: {
        ...formValues,
        ...(groupedValues || {}),
      },
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
      <MessageFieldArray name='mediaAndMessage' label='Write a message' />
    </SidebarFormContainer>
  );
}

export default MessageMediaNodeContent;
