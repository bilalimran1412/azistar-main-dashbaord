import React from 'react';
import { DraftEditorField, FormNodeRowsFieldArray } from '../Shared/FormUi';
import { FormNodeSettings, SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';

function FormNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const [activeSidebar, setActiveSidebar] = React.useState('');

  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);
  //TODO MOVE TO CONFIG
  // VARIABLE
  const initialValues = {
    //this message will contain all the ops and html and normal text
    message: currentNode?.data?.params?.message || {
      text: config.fields.placeholder,
    },
    nodeTextContent: currentNode?.data?.params?.nodeTextContent,

    rows: currentNode?.data?.params?.rows || config?.data?.params?.rows || '',

    // move to config
    extra: currentNode?.data?.params?.extra || config?.data?.params?.extra,
    hasSkipButton:
      currentNode?.data?.params?.hasSkipButton ||
      config?.data?.params?.hasSkipButton,
    sendLabel:
      currentNode?.data?.params?.sendLabel || config?.data?.params?.sendLabel,
    skipLabel:
      currentNode?.data?.params?.skipLabel || config?.data?.params?.skipLabel,
  };

  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const { rows, ...rest } = formValues;
    const filteredRows = rows?.filter((row) => row?.questions?.length);

    updateNodeById(id, {
      params: {
        rows: filteredRows?.length ? filteredRows : config?.data?.rows,
        ...rest,
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
      <DraftEditorField
        name='message'
        placeholder={config.fields.placeholder}
        label={config.fields.label}
        labelVariant='h1'
        setNodeContent={true}
      />
      <FormNodeSettings
        setActiveSidebar={setActiveSidebar}
        activeSidebar={activeSidebar}
      />
      <FormNodeRowsFieldArray
        name='rows'
        setActiveSidebar={setActiveSidebar}
        activeSidebar={activeSidebar}
      />
    </SidebarFormContainer>
  );
}

export default FormNodeContent;
