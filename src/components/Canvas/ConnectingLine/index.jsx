// import React from 'react';
// import { useConnection } from '@xyflow/react';

//Cannot use it as we are using reactflow 11

// function ConnectingLine({ fromX, fromY, toX, toY }) {
//     const { fromHandle } = useConnection();

//     return (
//         <g>
//             <path
//                 fill="none"
//                 stroke={fromHandle.id}
//                 strokeWidth={1.5}
//                 className="animated"
//                 d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
//             />
//             <circle
//                 cx={toX}
//                 cy={toY}
//                 fill="#fff"
//                 r={3}
//                 stroke={fromHandle.id}
//                 strokeWidth={1.5}
//             />
//         </g>
//     );
// };
