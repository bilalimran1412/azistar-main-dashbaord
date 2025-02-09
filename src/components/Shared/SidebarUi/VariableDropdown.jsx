// import React, { useState, useRef } from 'react';
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   PopoverArrow,
//   PopoverHeader,
//   PopoverBody,
//   Input,
//   List,
//   ListItem,
//   IconButton,
//   Box,
//   Text,
//   Flex,
// } from '@chakra-ui/react';
// import { FaTrash } from 'react-icons/fa';
// import { FaCableCar } from 'react-icons/fa6';

// const SearchPopover = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const inputRef = useRef(null); // Create a ref for the input

//   // Example grouped items
//   const groupedItems = {
//     'Group 1': ['Item 1', 'Item 2'],
//     'Group 2': ['Item 3', 'Item 4'],
//     'Group 3': ['Item 5'],
//   };

//   // Filter items based on input value
//   const filteredItems = Object.entries(groupedItems).reduce(
//     (acc, [group, items]) => {
//       const filtered = items.filter((item) =>
//         item.toLowerCase().includes(inputValue.toLowerCase())
//       );
//       if (filtered.length) {
//         acc.push({ group, items: filtered });
//       }
//       return acc;
//     },
//     []
//   );

//   const handleInputChange = (event) => {
//     const value = event.target.value;
//     setInputValue(value);
//   };

//   const handlePopoverClose = () => {
//     setInputValue('');
//     // setIsOpen(false);
//   };

//   const handleDeleteItem = (group, item) => {
//     // Logic to delete an item from the groupedItems (this example is static)
//     console.log(`Delete ${item} from ${group}`);
//     // You can implement state management for the grouped items here
//   };

//   return (
//     <Popover
//       isOpen={isOpen}
//       onClose={handlePopoverClose}
//       initialFocusRef={inputRef}
//     >
//       <PopoverTrigger>
//         <Input
//           ref={inputRef}
//           placeholder='Search...'
//           value={inputValue}
//           onChange={handleInputChange}
//           onFocus={() => setIsOpen(true)}
//         />
//       </PopoverTrigger>
//       <PopoverContent bg='white' boxShadow='lg' onBlur={() => setIsOpen(false)}>
//         <PopoverHeader>Search Results</PopoverHeader>
//         <PopoverBody>
//           {filteredItems.length > 0 ? (
//             <List spacing={2}>
//               {filteredItems.map(({ group, items }) => (
//                 <Box key={group} mb={2}>
//                   <Text fontWeight='bold' mb={1}>
//                     {group}
//                   </Text>
//                   {items.map((item, index) => (
//                     <ListItem key={index} cursor='pointer'>
//                       <Flex justify='space-between' align='center'>
//                         <Flex align='center'>
//                           <FaTrash style={{ marginRight: 8 }} />
//                           <Text>{item}</Text>
//                         </Flex>
//                         <IconButton
//                           icon={<FaCableCar />}
//                           size='sm'
//                           onClick={() => handleDeleteItem(group, item)}
//                           aria-label='Delete item'
//                           variant='outline'
//                           colorScheme='red'
//                           display='none' // Initially hide
//                         />
//                       </Flex>
//                     </ListItem>
//                   ))}
//                 </Box>
//               ))}
//             </List>
//           ) : (
//             <div>No results found.</div>
//           )}
//         </PopoverBody>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default SearchPopover;
