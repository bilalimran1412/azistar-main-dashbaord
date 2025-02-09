import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  edgeType,
  errorEdgeType,
  initialGroupedOptions,
} from '../../config/constant';
import {
  contentType,
  nodeConfigurationBlockIdMap,
} from '../../config/nodeConfigurations';
import { v4 as uuidv4 } from 'uuid';
import { fetchWrapper } from '../../utils/fetchWrapper';

const NodeContext = createContext({
  nodes: [],
  edges: [],
  addNewNode: () => {},
  setNodes: () => {},
  setEdges: () => {},
  setSideView: () => {},
  currentNodeId: null,
  setCurrentNodeId: () => {},
  getNodeById: () => {},
  updateNodeById: () => {},
  insertNodeFromEdge: () => {},
  canvasInstance: null,
  setCanvasInstance: () => {},
  setBotID: () => {},
  updateBot: () => {},
  handleAddNewNode: () => {},
  handleNodeRemove: () => {},
  botID: null,
  groupedOptions: [],
  setGroupedOptions: () => {},
});

export const useNodeContext = () => useContext(NodeContext);

export const NodeProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [groupedOptions, setGroupedOptions] = useState(initialGroupedOptions);
  const [botID, setBotID] = React.useState('');
  const [sideViewVisible, setSideViewVisible] = useState(false);
  const [currentNodeId, setCurrentNodeId] = useState('');
  const [canvasInstance, setCanvasInstance] = React.useState(null);

  const addNewNode = useCallback(
    (sourceId, blockId, sourceHandle) => {
      const nodeToCreate = nodeConfigurationBlockIdMap[blockId];
      const sourceNode = nodes.find((n) => n.id === sourceId);
      const newNodeId = uuidv4();
      setCurrentNodeId(newNodeId);

      const position = {
        x: sourceNode.position.x + 400 || 100,
        y: sourceNode.position.y || 20,
      };
      const newNode = {
        id: newNodeId,
        position: position,
        type: nodeToCreate.nodeType,
        data: {
          ...nodeToCreate?.data,
          blockId: nodeToCreate.blockId,
        },
      };

      const sourceHandleId = sourceHandle?.id;
      const type = sourceHandle.type;

      const newEdge = {
        id: `e${sourceId}-${newNodeId}`,
        source: sourceId,
        target: newNodeId,
        animated: true,
        type: type === 'failure' ? errorEdgeType : edgeType,
        ...(sourceHandleId && { sourceHandle: sourceHandleId }),
      };

      if (nodeToCreate?.data?.contentType !== contentType.placeholderNodes) {
        if (sourceHandleId) {
          setEdges((pre) =>
            pre.filter((edge) => edge.sourceHandle !== sourceHandleId)
          );
        } else {
          setEdges((pre) => pre.filter((edge) => edge.source !== sourceId));
        }
        setEdges((prev) => [...prev, newEdge]);
      }
      setNodes((prev) => [...prev, newNode]);
      if (nodeToCreate?.data?.contentType === contentType.noSidebar) {
        return;
      }
      setSideViewVisible(true);
    },
    [nodes]
  );

  const insertNodeFromEdge = useCallback(
    (edgeID, sourceId, blockId, sourceHandleId, targetId) => {
      const nodeToCreate = nodeConfigurationBlockIdMap[blockId];
      const sourceNode = nodes.find((n) => n.id === sourceId);
      const newNodeId = uuidv4();
      setCurrentNodeId(newNodeId);

      const position = {
        x: sourceNode?.position?.x + 300 || 100,
        y: sourceNode?.position?.y || 100,
      };

      const newNode = {
        id: newNodeId,
        position,
        type: nodeToCreate.nodeType,
        data: {
          ...nodeToCreate?.data,
          blockId: nodeToCreate.blockId,
        },
      };

      const edgeToUpdate = edges.find((edge) => edge.id === edgeID);

      if (edgeToUpdate) {
        const updatedEdge = {
          ...edgeToUpdate,
          target: newNodeId,
        };

        const newEdge = {
          id: `e${newNodeId}-${targetId}`,
          source: newNodeId,
          target: targetId,
          animated: true,
          type: edgeType,
          ...(sourceHandleId && { sourceHandle: `source-${sourceHandleId}` }),
        };

        setNodes((prev) => [...prev, newNode]);
        setEdges((prev) => [
          ...prev.map((edge) => (edge.id === edgeID ? updatedEdge : edge)),
          newEdge,
        ]);
      } else {
        console.warn(`Edge with ID ${edgeID} not found.`);
      }
      if (nodeToCreate?.data?.contentType === contentType.noSidebar) {
        return;
      }
      setSideViewVisible(true);
    },
    [nodes, edges]
  );

  const setSideView = (visible) => {
    setSideViewVisible(visible);
  };

  const getNodeById = React.useCallback(
    (nodeID) => {
      return nodes.find((node) => node.id === nodeID);
    },
    [nodes]
  );

  const updateNodeById = React.useCallback((nodeID, updatedNodeData) => {
    setNodes((prevNodes) =>
      prevNodes.map((n) =>
        n.id === nodeID
          ? { ...n, data: { ...n.data, ...updatedNodeData, isReplaced: false } }
          : n
      )
    );
  }, []);

  const patchBot = React.useCallback(async () => {
    const diagram = {
      nodes,
      edges,
    };
    const newNodeid = '673477cc0729412ee45b2921';
    // if (!botID) return;
    if (!newNodeid) return;
    const customVariables = groupedOptions.find(
      (group) => group.data === 'CUSTOM_VARIABLES'
    ).options;

    try {
      await fetchWrapper({
        url: `/bot/${newNodeid}/update`,
        method: 'PATCH',
        body: {
          diagram: JSON.stringify(diagram),
          ...(customVariables && { customVariables: customVariables }),
        },
      });
    } catch (error) {
      console.error('Failed to update bot:', error);
    }
  }, [botID, edges, groupedOptions, nodes]);

  const handleAddNewNode = useCallback((node) => {
    setNodes((pre) => [...pre, node]);
  }, []);

  const handleNodeRemove = useCallback((nodeId) => {
    //Remove Edges and That single node.
    //To remove edge filter sourceId or targetID.
    setNodes((pre) => pre.filter((n) => n.id !== nodeId));
    setEdges((pre) =>
      pre.filter((edge) => edge.target !== nodeId && edge.source !== nodeId)
    );
  }, []);

  return (
    <NodeContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        addNewNode,
        setSideView, // Expose the function
        currentNodeId,
        setCurrentNodeId,
        sideViewVisible,
        getNodeById,
        updateNodeById,
        insertNodeFromEdge,
        setCanvasInstance,
        canvasInstance,
        setBotID,
        botID,
        updateBot: patchBot,
        handleAddNewNode,
        handleNodeRemove,
        groupedOptions,
        setGroupedOptions,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};