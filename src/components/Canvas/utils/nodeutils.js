import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { nodeConfigurationBlockIdMap } from '../../../config/nodeConfigurations';

// Function to toggle the visibility of a dropdown
export const useDropdownToggle = (initialState = false) => {
  const [isDropdownVisible, setDropdownVisible] = useState(initialState);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  const nodeRef = useRef(null);

  const toggleDropdown = (event) => {
    if (event && event.stopPropagation) {
      event.stopPropagation(); // Stop event propagation only if event is defined
    }
    setDropdownVisible((prev) => !prev);

    if (nodeRef.current) {
      // const nodeRect = nodeRef.current.getBoundingClientRect();
      setDropdownPosition({
        x: 150, // Adjust position as needed
        y: 30, // Adjust position as needed
      });
    }
  };

  return {
    isDropdownVisible,
    toggleDropdown,
    setDropdownVisible,
    dropdownPosition,
    nodeRef,
  };
};

// Action Handlers

export const handleCopyNode = (nodeId, nodes, handleAddNewNode) => {
  console.log('handleCopyNode called with nodeId:', nodeId);
  const nodeToCopy = nodes.find((node) => node.id === nodeId);

  const newPosition = {
    x: nodeToCopy.position.x,
    y: nodeToCopy.position.y + 100,
  };

  if (nodeToCopy) {
    const block = nodeConfigurationBlockIdMap[nodeToCopy.data?.blockId];
    const newNode = {
      ...nodeToCopy,
      id: uuidv4(),
      position: newPosition,
      data: { ...nodeToCopy.data, label: `${block.title} (Copy)` }, // Modify data if needed
    };
    handleAddNewNode(newNode);
  }
};

export const handleReplaceNode = (nodeId, nodes, handleAddNewNode, blockId) => {
  console.log(
    'handleReplaceNode called with nodeId:',
    nodeId,
    'newType:',
    blockId
  );
  const block = nodeConfigurationBlockIdMap[blockId];
  const nodeToReplace = nodes.find((node) => node.id === nodeId);

  if (nodeToReplace) {
    handleAddNewNode({ ...nodeToReplace, data: { ...block?.data, blockId } });
  }
};

// // Delete Node
// export const handleDeleteNode = (nodeId, nodes, setNodes, setSideView) => {
//   console.log('handleDeleteNode called with nodeId:', nodeId);
//   const nodeExists = nodes.some(node => node.id === nodeId);
//   if (nodeExists) {
//     setSideView(false)
//     setNodes((nds) => nds.filter((node) => node.id !== nodeId));
//     console.log('Node deleted:', nodeId);
//   } else {
//     console.warn('Node not found for deletion:', nodeId);
//   }
// };

export const handleDuplicateNode = (nodeId, nodes, handleAddNewNode) => {
  console.log('handleDuplicateNode called with nodeId:', nodeId);
  const nodeToDuplicate = nodes.find((node) => node.id === nodeId);
  if (nodeToDuplicate) {
    // Calculate new position: Offset by 100 pixels below the original node
    const newPosition = {
      x: nodeToDuplicate.position.x,
      y: nodeToDuplicate.position.y + 100,
    };
    const block = nodeConfigurationBlockIdMap[nodeToDuplicate.data?.blockId];

    const newNode = {
      ...nodeToDuplicate,
      id: uuidv4(),
      position: newPosition,
      data: {
        ...nodeToDuplicate.data,
        label: `${block.label} (Copy)`,
      }, // Modify data if needed
    };
    console.log('Duplicating node:', newNode);
    handleAddNewNode(newNode);
  } else {
    console.warn('Node not found for duplication:', nodeId);
  }
};

// let copiedNode = null;

export const handleCopyNodeId = (nodeId, nodes) => {
  console.log('handleCopyNodeId called with nodeId:', nodeId);
  const nodeToCopy = nodes.find((node) => node.id === nodeId);
  if (nodeToCopy) {
    navigator.clipboard.writeText(nodeToCopy.id).then(() => {
      alert('Node ID copied to clipboard');
    });
  }
};
