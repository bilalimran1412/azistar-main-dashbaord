import React, { createContext, useContext, useState, useCallback } from 'react'
import { edgeType, } from '../../config/constant'
import { nodeConfigurationBlockIdMap } from '../../config/nodeConfigurations'
import { v4 as uuidv4 } from 'uuid';
import { fetchWrapper } from '../../utils/fetchWrapper';


const NodeContext = createContext({
  nodes: [],
  edges: [],
  addNewNode: () => { },
  setNodes: () => { },
  setEdges: () => { },
  setSideView: () => { },
  currentNodeId: null,
  setCurrentNodeId: () => { },
  getNodeById: () => { },
  updateNodeById: () => { },
  insertNodeFromEdge: () => { },
  canvasInstance: null,
  setCanvasInstance: () => { },
  setBotID: () => { },
  updateBot: () => { },
  botID: null
})

export const useNodeContext = () => useContext(NodeContext)

export const NodeProvider = ({ children }) => {
  const [nodes, setNodes] = useState([])
  const [botID, setBotID] = React.useState('')
  const [edges, setEdges] = useState([])
  const [sideViewVisible, setSideViewVisible] = useState(false)
  const [currentNodeId, setCurrentNodeId] = useState('')
  const [canvasInstance, setCanvasInstance] = React.useState(null)

  const addNewNode = useCallback(
    (sourceId, blockId, sourceHandleId) => {
      const nodeToCreate = nodeConfigurationBlockIdMap[blockId]
      const sourceNode = nodes.find(n => n.id === sourceId)
      const newNodeId = uuidv4()
      setCurrentNodeId(newNodeId)

      const position = { x: sourceNode.position.x + 400 || 100, y: sourceNode.position.y || 20 }
      const newNode = {
        ...nodeToCreate, id: newNodeId, position: position, type: nodeToCreate.nodeType, data: {
          ...nodeToCreate?.data,
          blockId: nodeToCreate.blockId,
        }
      }

      const newEdge = {
        id: `e${sourceId}-${newNodeId}`,
        source: sourceId,
        target: newNodeId,
        animated: true,
        type: edgeType,
        ...(sourceHandleId && { sourceHandle: `source-${sourceHandleId}` }),
      }

      setNodes((prev) => [...prev, newNode])
      setEdges((prev) => [...prev, newEdge])
      setSideViewVisible(true) // Show SideView
    },
    [nodes]
  )
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
        ...nodeToCreate,
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

      setSideViewVisible(true);
    },
    [nodes, edges]
  );


  const setSideView = (visible) => {
    setSideViewVisible(visible)
  }

  const getNodeById = React.useCallback((nodeID) => {
    return nodes.find(node => node.id === nodeID)
  }, [nodes])

  const updateNodeById = React.useCallback((nodeID, updatedNodeData) => {
    setNodes(prevNodes =>
      prevNodes.map(n =>
        n.id === nodeID ? { ...n, data: { ...n.data, ...updatedNodeData, isReplaced: false } } : n
      )
    );
  }, [])

  const patchBot = React.useCallback(async () => {
    const diagram = {
      nodes, edges
    }
    if (!botID)
      return
    try {
      await fetchWrapper({
        url: `/bot/${botID}/update`,
        method: 'PATCH',
        body: {
          diagram: JSON.stringify(diagram),
        },
      });
    } catch (error) {
      console.error('Failed to update bot:', error);
    }
  }, [botID, edges, nodes])

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
        updateBot: patchBot
      }}
    >
      {children}
    </NodeContext.Provider>
  )
}
