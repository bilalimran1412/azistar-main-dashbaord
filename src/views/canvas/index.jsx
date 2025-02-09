import React from 'react';
import BotBuilderSidebar from './BotBuilderSidebar';
import { useFetchData } from '../../hooks/bot/useFetchData';
import { useParams } from 'react-router-dom';
import { Alert, AlertIcon, Spinner, Text } from '@chakra-ui/react';
import { NodeProvider, useNodeContext } from './NodeContext';
import { ReactFlowProvider } from '@xyflow/react';
import { useDropdownStore } from 'zustandStores';

//TODO UNCOMMENT FOR CONNECTING TO DB
function BotBuilderPage() {
  const { id: botId = null } = useParams();

  if (!botId) {
    return <>Bot ID is Required</>;
  }
  return (
    <ReactFlowProvider>
      <NodeProvider>
        <BotBuilder />
      </NodeProvider>
    </ReactFlowProvider>
  );
}

export default BotBuilderPage;

function BotBuilder() {
  const { id: botId = null } = useParams();
  const {
    setNodes,
    setEdges,
    setBotID,
    botID: contextBotId,
  } = useNodeContext();

  const setGroupedVariables = useDropdownStore(
    (store) => store.setGroupedVariables
  );
  const { data: botCopy, loading, error } = useFetchData(`/bot/${botId}/copy`);

  const diagram = React.useMemo(
    () => JSON.parse(botCopy?.data[0]?.diagram || '{}'),
    [botCopy]
  );

  const { nodes, edges } = diagram;
  React.useEffect(() => {
    if (nodes?.length) setNodes(nodes);
    if (edges?.length) setEdges(edges);
    const customVariables = botCopy?.data[0]?.customVariables;
    if (customVariables?.length) {
      setGroupedVariables(customVariables);
      if (!contextBotId) {
        setBotID(botId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botCopy?.data, botId, edges, nodes]);

  if (loading) {
    return (
      <>
        <Spinner size='lg' />
      </>
    );
  }
  if (error) {
    return (
      <>
        <Alert status='error'>
          <AlertIcon />
          <Text>{error.message}</Text>
        </Alert>
      </>
    );
  }

  //TODO change true to botCopy
  return <>{botCopy && <BotBuilderSidebar />}</>;
}
