import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';
import BaseEdgeLayout from './BaseEdgeLayout';

export default function CustomEdge({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  sourceHandleId,
  type,
}) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const { isHover = false } = data || {};

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={style}
        className={type}
      />
      <EdgeLabelRenderer>
        <BaseEdgeLayout
          edgeId={id}
          isHover={isHover}
          labelX={labelX}
          labelY={labelY}
          onEdgeClick={onEdgeClick}
          sourceNodeId={source}
          sourceHandleId={sourceHandleId}
          targetId={target}
          type={type}
        />
      </EdgeLabelRenderer>
    </>
  );
}
