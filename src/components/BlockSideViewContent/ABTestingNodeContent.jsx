import React from 'react';
import { SidebarFormContainer } from '../Shared/SidebarUi';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { yup } from '../../utils/yup';
import FormSlider from '../Shared/FormUi/FormSlider';

function ABTestingNodeContent({ id }) {
  const { getNodeById, setSideView, updateNodeById } = useNodeContext();
  const currentNode = getNodeById(id);
  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];
  const handleClose = () => {
    setSideView(false);
  };
  if (!config) return <></>;
  // console.log('creating sidebar for block', config);
  //TODO MOVE TO CONFIG
  // MAKE IT 50 50

  const initialValues = {
    abSplit: currentNode?.data?.params?.abSplit || config?.data?.params.abSplit,
  };
  const validationSchema = yup.object({});

  const onSave = (formValues) => {
    console.log('Form values=>>>', formValues);
    const aPercent = formValues?.abSplit;
    const bPercent = 100 - aPercent;
    const buttons = [
      { id: 'ab-test-a', text: `A (${aPercent}%)` },
      { id: 'ab-test-b', text: `B (${bPercent}%)` },
    ];
    const nodeTextContent = `${aPercent}/${bPercent} split`;
    updateNodeById(id, {
      params: {
        aPercent,
        bPercent,
        buttons,
        nodeTextContent,
        ...formValues,
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
      <FormSlider name='abSplit' label={'Define AB split percentage'} />
    </SidebarFormContainer>
  );
}

export default ABTestingNodeContent;
