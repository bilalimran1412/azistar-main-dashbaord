import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
// import { HSeparator } from 'components/separator/Separator';
// import DefaultAuthLayout from 'layouts/auth/Default';
// Assets
import { Link } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/stepform.css'
import '../LiveChat/live-chat.css'
import bcrypt from 'bcryptjs';


export default function SignUp() {
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
  const textColorBrand = useColorModeValue('brand.500', 'white');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const googleBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.200');
  const googleText = useColorModeValue('navy.700', 'white');
  const googleHover = useColorModeValue(
    { bg: 'gray.200' },
    { bg: 'whiteAlpha.300' },
  );
  const [activeclass, setActiveClass] = useState('');
  const [loading, setLoading] = useState(false);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const baseURL = process.env.REACT_APP_API_BASE_URL;


  const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  const handleSubmit = async () => {
    setMessage('');
    setError('');
    setActiveClass('');
    setLoading(true)
    try {
      const hashedPassword = await hashPassword(password);
      const signupData = {
        email: email,
        password: password,
        website: website,
      };

      console.log(signupData);
      const response = await fetch(`${baseURL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('data', data);
        localStorage.setItem('userId', data.userId);
        setActiveClass('success_active');
        setMessage('User Signup Successful');
        setLoading(false);
        
        setTimeout(() => {
          window.location.href = '/assigned';
          setActiveClass('');
        }, 500)
      } else {
        setError(data.message || 'Failed to submit');
        setMessage(data.message || 'Failed to submit');
        setActiveClass('');
      }
    } catch (error) {
      setError('An error occurred');
      console.error('Signup error:', error);
      setMessage('Signup error:', error);
    }
    setLoading(false)
  };

  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' },
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    // <DefaultAuthLayout illustrationBackground={'/img/auth/auth.png'}>
    <div className='sign_up'>
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '30px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '30px' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign Up
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign up!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >

          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)} ms={{ base: '0px', md: '0px' }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? 'text' : 'password'}
                variant="auth"
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: 'pointer' }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Website<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              type="Website"
              placeholder="https://example.com"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={handleSubmit}
              disabled={loading}
            >

              {loading ? 'Signing...' : 'Sign Up'}
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Link href="/signin">
              <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                Already Registered
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Log in
                  {message ? (
                    <p className={`${activeclass} notify_message`}>{message}</p>
                  ) : null}

                  {error}
                </Text>
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </div>
    // </DefaultAuthLayout>
  );
}

