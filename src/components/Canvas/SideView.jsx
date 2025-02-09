import React from 'react';

import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { SideViewContent } from '../BlockSideViewContent';
import DefaultNodeContent from '../BlockSideViewContent/DefaultNodeContent';
import { Box } from '@chakra-ui/react';

const SideView = ({ closeForm }) => {
  const { getNodeById, currentNodeId } = useNodeContext();

  const currentNode = React.useMemo(
    () => getNodeById(currentNodeId),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentNodeId]
  );

  const config = nodeConfigurationBlockIdMap[currentNode.data.blockId];

  if (!currentNodeId) {
    return <></>;
  }

  const Content = config?.data?.layoutType
    ? SideViewContent[config?.data?.layoutType]
    : DefaultNodeContent;

  return (
    <Box
      position='absolute'
      top='0'
      h='100vh'
      w='400px'
      display='flex'
      flexDirection='column'
      zIndex='50'
      transition='all 0.5s ease'
      flex='1'
      overflowX='hidden'
      overflowY='auto'
      bg='#f8f8f8'
      style={{
        width: config?.width ? config?.width : '400px',
      }}
    >
      {Content ? <Content id={currentNodeId} /> : <></>}
    </Box>
  );
};

export default SideView;
