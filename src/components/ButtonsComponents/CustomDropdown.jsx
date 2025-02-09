// import React, { useState } from 'react';
// import {
//   Box,
//   Menu,
//   MenuButton,
//   MenuItem,
//   Badge,
//   Button,
//   useDisclosure,
// } from '@chakra-ui/react';
// import { FaCaretDown } from 'react-icons/fa';

// const CustomDropdown = () => {
//   const [selectedOption, setSelectedOption] = useState('');
//   const { isOpen, onToggle } = useDisclosure();

//   const handleSelect = (option) => {
//     setSelectedOption(option);
//     onToggle(); // Close the menu after selection
//   };

//   return (
//     <Box>
//       <Menu>
//         <MenuButton
//           as={Button}
//           rightIcon={<FaCaretDown />}
//           bg='teal.500'
//           color='white'
//           _hover={{ bg: 'teal.600' }}
//           _active={{ bg: 'teal.700' }}
//         >
//           {selectedOption || 'Select an option'}
//         </MenuButton>
//         <MenuItem>
//           <Box
//             borderWidth='1px'
//             borderRadius='md'
//             overflow='hidden'
//             bg='white'
//             boxShadow='md'
//             w='200px'
//             p='4'
//           >
//             <Box mb='2' fontWeight='bold' fontSize='lg'>
//               File Related Options
//             </Box>
//             <Box>
//               <Badge
//                 colorScheme='green'
//                 onClick={() => handleSelect('Icons')}
//                 cursor='pointer'
//                 mr='2'
//               >
//                 Icons
//               </Badge>
//               <Badge
//                 colorScheme='blue'
//                 onClick={() => handleSelect('Open File')}
//                 cursor='pointer'
//                 mr='2'
//               >
//                 Open File
//               </Badge>
//               <Badge
//                 colorScheme='red'
//                 onClick={() => handleSelect('Save File')}
//                 cursor='pointer'
//               >
//                 Save File
//               </Badge>
//             </Box>
//             <Box mt='4' mb='2' fontWeight='bold' fontSize='lg'>
//               Button Related Options
//             </Box>
//             <Box>
//               <Badge
//                 colorScheme='purple'
//                 onClick={() => handleSelect('Submit Button')}
//                 cursor='pointer'
//                 mr='2'
//               >
//                 Submit Button
//               </Badge>
//               <Badge
//                 colorScheme='orange'
//                 onClick={() => handleSelect('Reset Button')}
//                 cursor='pointer'
//                 mr='2'
//               >
//                 Reset Button
//               </Badge>
//               <Badge
//                 colorScheme='pink'
//                 onClick={() => handleSelect('Cancel Button')}
//                 cursor='pointer'
//               >
//                 Cancel Button
//               </Badge>
//             </Box>
//           </Box>
//         </MenuItem>
//       </Menu>
//     </Box>
//   );
// };

// export default CustomDropdown;
