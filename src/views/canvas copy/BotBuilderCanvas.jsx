import React from 'react';
import 'reactflow/dist/style.css';
import './canvas.css';
import '../../index.css';

import { useNodeContext } from './NodeContext';
import ReactFlowCanvas from './ReactFlowCanvas';
import NodeDropdownMenu from '../../components/Canvas/NodeDropdownMenu';
import SideView from '../../components/Canvas/SideView';

const BotBuilderCanvas = () => {
    const { nodes, setNodes, setSideView, sideViewVisible, currentNodeId, updateBot } = useNodeContext();
    const [dropdownPosition] = React.useState({ x: 0, y: 0 });
    const [showDropdown] = React.useState(false);

    const handleAddNode = (type) => {
        const newNode = {
            id: `${nodes.length + 1}`,
            data: { label: type },
            position: { x: Math.random() * 500, y: Math.random() * 500 },
            type,
        };

        setNodes((nds) => [...nds, newNode]);
    };

    const closeForm = () => {
        console.log('Attempting to close SideView');
        if (typeof setSideView === 'function') {
            setSideView(false);
            console.log('setSideView executed');
        } else {
            console.error('setSideView is not a function');
        }
    };

    return (
        <div className="canvas" style={{ height: '100vh', zIndex: '1000', background: '#454b6b', position: 'relative' }}>
            <div style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                background: "white",
                padding: "15px",
                cursor: "pointer",
                zIndex: 10

            }}
                onClick={updateBot}>
                Save
            </div>
            <ReactFlowCanvas />
            {sideViewVisible && currentNodeId && (
                <div className="newsetmessage absolute bg-gray-300 w-[400px] rounded-md">
                    <SideView
                        closeForm={closeForm}
                        key={currentNodeId}
                    />
                </div>
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

export default BotBuilderCanvas;
