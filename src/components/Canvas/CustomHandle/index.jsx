import { Handle } from '@xyflow/react';
import React from 'react';
import { MdAdd } from 'react-icons/md';

function CustomHandle({ id, type, onClick, status = 'success', styles = {} }) {
  if (type === 'target')
    return (
      <Handle
        type='target'
        position='left'
        id={id}
        style={{
          borderRadius: '0px',
          width: '2px',
          height: '25px',
          outline: '2px solid lightgreen',
          background: 'lightgreen',
          ...styles,
        }}
      />
    );
  else if (type === 'source') {
    return (
      <>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClick(id);
          }}
        >
          <Handle
            type='source'
            position='right'
            id={id}
            style={{
              background: status === 'success' ? '#4AB8B3' : '#d7376b',
              padding: '10px',
              right: '0px',
              cursor: 'pointer',
              ...styles,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '3px',
                left: '3px',
                pointerEvents: 'none',
                fontSize: '14px',
                color: 'white',
              }}
            >
              <MdAdd />
            </div>
          </Handle>
        </div>
      </>
    );
  }
  return <></>;
}

export default CustomHandle;
