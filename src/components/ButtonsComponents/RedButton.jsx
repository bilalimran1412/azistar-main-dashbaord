// import {
//   Box,
//   Button,
//   Flex,
//   FormLabel,
//   Image,
//   Input,
//   Select,
// } from '@chakra-ui/react';
// import React from 'react';
// import { FaGear } from 'react-icons/fa6';
// import { FaTrashAlt } from 'react-icons/fa';
// import { PiDotsSixVertical } from 'react-icons/pi';
// import { FaCameraRetro } from 'react-icons/fa';
// import { useState } from 'react';
// import UploadButton from './UploadButton';
// import { FormDropdown, FormTextField } from '../Shared/FormUi';
// import IconSelector from '../Shared/SidebarUi/IconSelector';
// import FileSelector from '../Shared/SidebarUi/FileSelector';
// import ButtonCreatorInput from '../Shared/SidebarUi/ButtonCreatorInput';
// // Custom button component

// const buttonStyleOptions = [
//   {
//     value: 'text',
//     label: 'Text button',
//   },
//   {
//     label: 'Icon',
//     value: 'icon',
//   },
//   {
//     label: 'Emoji',
//     value: 'emoji',
//   },

//   {
//     label: 'Image',
//     value: 'image',
//   },
// ];
// export const RedButton = ({ btnText }) => {
//   // const [selectedOption, setSelectedOption] = useState('icon');
//   // const [selected, setSelected] = useState('option1');
//   // const [imageSrc, setImageSrc] = useState(null);
//   // const [toggle, setToggle] = useState(true);

//   // const handleFileSelect = (fileUrl) => {
//   //   setImageSrc(fileUrl);
//   // };
//   // TODO MODIFY LINE 60 FOR INPUT FIELD
//   return (
//     <div
//       style={{
//         minHeight: '100vh',
//         display: 'flex',
//         justifyContent: 'flex-start',
//         alignItems: 'flex-start',
//         flexDirection: 'column',
//       }}
//     >
//       <Box width='100%'>
//         <FormLabel>Buttons Editor</FormLabel>
//         <Box bgColor={'#42456A'} padding='10px' rounded={'3px'} width='100%'>
//           <Flex flex={1} gap={2} direction='column'>
//             <ButtonCreatorInput />
//             {false && (
//               <Flex
//                 bg={'#8a9ba826'}
//                 borderRadius={'3px'}
//                 flex={1}
//                 padding='10px 12px 9px'
//                 direction='column'
//                 gap={5}
//                 className='button-select-container'
//               >
//                 <FormDropdown
//                   name='iconType'
//                   label='Button Style'
//                   options={buttonStyleOptions}
//                 />

//                 <IconSelector setIcon={() => {}} />
//                 <FileSelector />
//                 <FormTextField
//                   name='externalLink'
//                   label='External Link'
//                   placeholder='https://'
//                 />
//               </Flex>
//             )}
//           </Flex>
//           <Box
//             w={'100%'}
//             borderRadius={'15px'}
//             bg={'#3A3C5D'}
//             minH={'40px'}
//             display={'flex'}
//             alignItems={'center'}
//             textColor={'#fff'}
//             style={{ cursor: 'pointer' }}
//             gap={'16px'}
//             mt={'16px'}
//           >
//             <Box
//               width={'40px'}
//               height={'40px'}
//               bg={'#9CA3AF'}
//               borderRadius={'100%'}
//               justifyContent={'center'}
//               alignItems={'center'}
//               display={'flex'}
//               textColor={'#000'}
//             >
//               +
//             </Box>
//             Add another Button...
//           </Box>
//         </Box>
//       </Box>

//       {/* Bottom Section */}
//       {/* <Box
//         display={'flex'}
//         justifyContent={'space-between'}
//         alignItems={'center'}
//         w={'100%'}
//         gap={'1rem'}
//         flexDirection={'column'}
//         mt={'20px'}
//       >
//         <Box
//           bg={'#E5E7EA'}
//           rounded={'2px'}
//           style={{ fontSize: '11px' }}
//           w={'100%'}
//           p={'8px'}
//         >
//           <p>Press ⚙️ to set up icons/images/URLs to the buttons</p>{' '}
//         </Box>
//         <Box
//           display={'flex'}
//           justifyContent={'space-between'}
//           alignItems={'center'}
//           w={'100%'}
//           gap={'1rem'}
//         >
//           <p style={{ fontSize: '11px' }}>Buttons alignment</p>
//           <Box display='flex' bg={'#D0D7DD'} p={'2px'} borderRadius={'2px'}>
//             <Button
//               onClick={() => setSelected('option1')}
//               borderRadius='8px'
//               fontWeight={'smaller'}
//               color={selected === 'option1' ? 'white' : 'black'}
//               style={{
//                 backgroundColor: selected === 'option1' ? 'white' : '#D0D7DD',
//                 border: 'none',
//                 fontSize: '11px',
//                 textTransform: 'uppercase',
//               }}
//               bg={'#D0D7DD'}
//             >
//               Option 1
//             </Button>
//             <Button
//               onClick={() => setSelected('option2')}
//               borderRadius='8px'
//               fontWeight={'smaller'}
//               color={selected === 'option2' ? 'white' : 'black'}
//               style={{
//                 backgroundColor: selected === 'option2' ? 'white' : '#D0D7DD',
//                 border: 'none',
//                 fontSize: '11px',
//                 textTransform: 'uppercase',
//               }}
//             >
//               Option 2
//             </Button>
//           </Box>
//         </Box>
//         <Box
//           display={'flex'}
//           justifyContent={'space-between'}
//           alignItems={'center'}
//           w={'100%'}
//           gap={'1rem'}
//         >
//           <p style={{ fontSize: '11px' }}>Randomize order</p>
//           <Box display='flex' bg={'#D0D7DD'} p={'2px'} borderRadius={'2px'}>
//             <Button
//               onClick={() => setSelected('no')}
//               borderRadius='8px'
//               fontWeight={'smaller'}
//               color={selected === 'no' ? 'white' : 'black'}
//               style={{
//                 backgroundColor: selected === 'no' ? 'white' : '#D0D7DD',
//                 border: 'none',
//                 fontSize: '11px',
//                 textTransform: 'uppercase',
//               }}
//               bg={'#D0D7DD'}
//             >
//               No
//             </Button>
//             <Button
//               onClick={() => setSelected('yes')}
//               borderRadius='8px'
//               fontWeight={'smaller'}
//               color={selected === 'yes' ? 'white' : 'black'}
//               style={{
//                 backgroundColor: selected === 'yes' ? 'white' : '#D0D7DD',
//                 border: 'none',
//                 fontSize: '11px',
//                 textTransform: 'uppercase',
//               }}
//             >
//               Yes
//             </Button>
//           </Box>
//         </Box>
//         <Box
//           display={'flex'}
//           justifyContent={'space-between'}
//           alignItems={'center'}
//           w={'100%'}
//           gap={'1rem'}
//         >
//           <p style={{ fontSize: '11px' }}>Searchable Options</p>
//           <Box display='flex' bg={'#D0D7DD'} p={'2px'} borderRadius={'2px'}>
//             <Button
//               onClick={() => setSelected('no')}
//               borderRadius='8px'
//               fontWeight={'smaller'}
//               color={selected === 'no' ? 'white' : 'black'}
//               style={{
//                 backgroundColor: selected === 'no' ? 'white' : '#D0D7DD',
//                 border: 'none',
//                 fontSize: '11px',
//                 textTransform: 'uppercase',
//               }}
//               bg={'#D0D7DD'}
//             >
//               No
//             </Button>
//             <Button
//               onClick={() => setSelected('yes')}
//               borderRadius='8px'
//               fontWeight={'smaller'}
//               color={selected === 'yes' ? 'white' : 'black'}
//               style={{
//                 backgroundColor: selected === 'yes' ? 'white' : '#D0D7DD',
//                 border: 'none',
//                 fontSize: '11px',
//                 textTransform: 'uppercase',
//               }}
//             >
//               Yes
//             </Button>
//           </Box>
//         </Box>
//         <hr style={{ height: '1px', backgroundColor: '#ccc', width: '100%' }} />
//         <Box
//           display={'flex'}
//           justifyContent={'space-between'}
//           alignItems={'center'}
//           w={'100%'}
//           gap={'1rem'}
//         >
//           <p style={{ fontSize: '11px' }}>Multiple Choices</p>
//           <Box display='flex' bg={'#D0D7DD'} p={'2px'} borderRadius={'2px'}>
//             <Button
//               onClick={() => setSelected('no')}
//               borderRadius='8px'
//               fontWeight={'smaller'}
//               color={selected === 'no' ? 'white' : 'black'}
//               style={{
//                 backgroundColor: selected === 'no' ? 'white' : '#D0D7DD',
//                 border: 'none',
//                 fontSize: '11px',
//                 textTransform: 'uppercase',
//               }}
//               bg={'#D0D7DD'}
//             >
//               No
//             </Button>
//             <Button
//               onClick={() => setSelected('yes')}
//               borderRadius='8px'
//               fontWeight={'smaller'}
//               color={selected === 'yes' ? 'white' : 'black'}
//               style={{
//                 backgroundColor: selected === 'yes' ? 'white' : '#D0D7DD',
//                 border: 'none',
//                 fontSize: '11px',
//                 textTransform: 'uppercase',
//               }}
//             >
//               Yes
//             </Button>
//           </Box>
//         </Box>
//         {/* <CustomDropdown /> */}
//       {/* </Box> */}
//     </div>
//   );
// };
