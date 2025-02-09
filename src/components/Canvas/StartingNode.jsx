// StartingNode.jsx
import React from 'react';
import BaseNode from './BaseNode';

const StartingNode = (props) => {
  return <BaseNode {...props} type='startingNode' label='Starting Node' />;
};

export default StartingNode;
