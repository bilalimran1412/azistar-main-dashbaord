import React from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';
import { useDropdownToggle } from './utils/nodeutils';
import NodeDropdownMenu from './NodeDropdownMenu';
import { useNodeContext } from '../../views/canvas/NodeContext';
import { Box } from '@chakra-ui/react';

function BaseEdgeLayout({
  edgeId,
  sourceNodeId,
  onEdgeClick,
  labelX,
  labelY,
  isHover,
  sourceHandleId,
  targetId,
  type,
}) {
  const {
    isDropdownVisible,
    toggleDropdown,
    dropdownPosition,
    nodeRef,
    dropdownRef,
  } = useDropdownToggle();
  const { insertNodeFromEdge } = useNodeContext();

  const handleAddNode = (blockId) => {
    toggleDropdown();
    insertNodeFromEdge(edgeId, sourceNodeId, blockId, sourceHandleId, targetId);
  };
  const shown = isHover || isDropdownVisible;

  return (
    <Box
      style={{
        position: 'absolute',
        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
        fontSize: 12,
        pointerEvents: 'all',
        display: shown ? 'flex' : 'none',
        gap: '10px',
        top: '10px',
        flexDirection: 'column',
        zIndex: 20,
      }}
      className='nodrag nopan'
      ref={nodeRef}
    >
      <Box
        cursor='pointer'
        display='flex'
        alignItems='center'
        justifyContent='center'
        p='2px'
        borderRadius='50%'
        top='50%'
        transform='translateY(-50%)'
        right='-11px'
        bg={type === 'errorBaseEdge' ? '#d7376b' : '#4ab8b3'}
        onClick={toggleDropdown}
        fontSize='18px'
        color='#fff'
        style={{
          position: 'relative',
        }}
      >
        <MdAdd />
      </Box>
      <Box
        cursor='pointer'
        display='flex'
        alignItems='center'
        justifyContent='center'
        p='2px'
        borderRadius='50%'
        top='50%'
        transform='translateY(-50%)'
        right='-11px'
        bg={type === 'errorBaseEdge' ? '#d7376b' : '#4ab8b3'}
        fontSize='18px'
        color='#fff'
        onClick={onEdgeClick}
        style={{
          position: 'relative',
        }}
      >
        <MdDelete />
      </Box>
      {isDropdownVisible && (
        <NodeDropdownMenu
          handleAddNode={handleAddNode}
          dropdownPosition={dropdownPosition}
          dropdownRef={dropdownRef}
        />
      )}
    </Box>
  );
}

export default BaseEdgeLayout;
