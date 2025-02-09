// import React, { useRef } from 'react';
// import { Button, Icon, Box } from '@chakra-ui/react';
// import { FaUpload } from 'react-icons/fa';

// const UploadButton = ({ onFileSelect }) => {
//   const fileInputRef = useRef(null);

//   const handleClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleChange = (e) => {
//     const file = e.target?.files[0];
//     if (file) {
//       onFileSelect(file);
//     }
//   };

//   return (
//     <Box>
//       <Button
//         bg='white'
//         color='black'
//         border='1px'
//         borderColor='gray.300'
//         _hover={{ bg: 'gray.100' }}
//         _active={{ bg: 'gray.200' }}
//         leftIcon={<Icon as={FaUpload} color='black' />}
//         variant='solid'
//         p='10px 20px'
//         onClick={handleClick}
//       >
//         Upload File
//       </Button>
//       <input
//         type='file'
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={handleChange}
//       />
//     </Box>
//   );
// };

// export default UploadButton;
