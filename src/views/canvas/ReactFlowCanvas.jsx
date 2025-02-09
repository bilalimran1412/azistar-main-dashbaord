import React, { useCallback } from 'react';

import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './canvas.css';
import '../../index.css';
import { useNodeContext } from './NodeContext';
import { CustomNode } from '../../components/Canvas/CustomNode';
import CustomEdge from '../../components/Canvas/BaseEdge';

const nodeTypes = {
  baseNode: CustomNode,
};

const edgeTypes = {
  baseEdge: CustomEdge,
  errorBaseEdge: CustomEdge,
};

const ReactFlowCanvas = () => {
  const { nodes, setNodes, edges, setEdges, setCanvasInstance } =
    useNodeContext();

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((eds) =>
        applyEdgeChanges(changes, eds).map((e) => ({
          ...e,
          // type: 'baseEdge',
          animated: true,
        }))
      ),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const existingEdges = eds.filter((edge) => {
          return params.sourceHandle
            ? edge.sourceHandle !== params.sourceHandle
            : edge.source !== params.source;
        });
        const isErrorEdge = params.sourceHandle?.includes('failure');
        const newEdges = addEdge(params, existingEdges).map((e) => {
          return {
            ...e,
            type:
              isErrorEdge && e.sourceHandle === params.sourceHandle
                ? 'errorBaseEdge'
                : e.type,
            animated: true,
          };
        });
        return newEdges;
      });
    },
    [setEdges]
  );

  const onEdgeMouseEnter = React.useCallback(
    (event, edge) => {
      setEdges((prevEdges) =>
        prevEdges.map((e) =>
          e.id === edge.id ? { ...e, data: { isHover: true } } : e
        )
      );
    },
    [setEdges]
  );

  const onEdgeMouseLeave = React.useCallback(
    (event, edge) => {
      setEdges((prevEdges) =>
        prevEdges.map((e) => ({ ...e, data: { isHover: false } }))
      );
    },
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      onInit={setCanvasInstance}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitViewOptions={{ padding: 0.2 }}
      onEdgeMouseEnter={onEdgeMouseEnter}
      onEdgeMouseLeave={onEdgeMouseLeave}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      snapToGrid={true}
      snapGrid={[15, 15]}
    >
      <Controls />
      <Background variant='dots' />
    </ReactFlow>
  );
};

export default ReactFlowCanvas;
