import React from 'react';
import { useNodeContext } from './NodeContext';
import ReactFlowCanvas from './ReactFlowCanvas';
import NodeDropdownMenu from '../../components/Canvas/NodeDropdownMenu';
import SideView from '../../components/Canvas/SideView';

const BotBuilderSidebar = () => {
  const {
    nodes,
    setNodes,
    setSideView,
    sideViewVisible,
    currentNodeId,
    updateBot,
  } = useNodeContext();
  const [dropdownPosition] = React.useState({ x: 0, y: 0 });
  const [showDropdown] = React.useState(false);

  const handleAddNode = (type) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: type },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      type,
    };
    alert('ran handle in BotBuilderSidebar.');

    setNodes((nds) => [...nds, newNode]);
  };

  const closeForm = () => {
    if (typeof setSideView === 'function') {
      setSideView(false);
    }
  };

  return (
    <div
      className='canvas'
      style={{
        height: '100vh',
        zIndex: '1000',
        background: '#454b6b',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          background: 'white',
          padding: '15px',
          cursor: 'pointer',
          zIndex: 10,
        }}
        onClick={updateBot}
      >
        Save
      </div>
      <ReactFlowCanvas />
      {sideViewVisible && currentNodeId && (
        <SideView closeForm={closeForm} key={currentNodeId} />
      )}
      {showDropdown && (
        <NodeDropdownMenu
          handleAddNode={handleAddNode}
          dropdownPosition={dropdownPosition}
        />
      )}
    </div>
  );
};

export default BotBuilderSidebar;
