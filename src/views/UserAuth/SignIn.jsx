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
import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/stepform.css'
import '../LiveChat/live-chat.css'

export default function SignIn() {
  // Chakra color mode
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
  const [message, setMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login, setLogin] = useState(false);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async () => {
    try {
        setMessage('');
        setActiveClass('');
        setLoading(true);
        setLogin(true);
        console.log('Email:', email, 'Password:', password);

        // Attempt to login with the main authentication API
        let response = await axios.post(`${baseURL}/auth/login`, { email, password });

        if (response.data) {
            console.log('Login successful:', response.data);
            setActiveClass('success_active');
            setMessage('Login Successful');
            localStorage.setItem('userId', response.data.data.userId);
            console.log('userId', response.data.data.userId);
            localStorage.setItem('token', response.data.token);
            redirectToAssigned();
            return; 
        }

    } catch (error) {
        console.warn('Auth login failed, trying agent login:', error);
    }

    try {
        const agentResponse = await axios.post(`${baseURL}/agents/login`, { email, password });

        if (agentResponse.data) {
            console.log('Agent login successful:', agentResponse.data);
            setActiveClass('success_active');
            setMessage('Login Successful');
            localStorage.setItem('userId', agentResponse.data.agent.id);
            redirectToAssigned();
            return; 
        }
    } catch (error) {
        console.error('Agent login failed:', error);
        setError('Login failed. Please try again.');
        setMessage('Login failed. Please try again.');
    } finally {
        setLoading(false);
        setLogin(false);
    }
};

const redirectToAssigned = () => {
    setTimeout(() => {
      setLoading(false);

        window.location.href = '/assigned';
        setActiveClass('');
    }, 500);
};




  const googleActive = useColorModeValue(
    { bg: 'secondaryGray.300' },
    { bg: 'whiteAlpha.200' },
  );
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <div className='login_form'>
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
        <h1>Signin</h1>
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
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
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember-login"
                  colorScheme="brandScheme"
                  me="10px"
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
              {/* <Link href="/auth/forgot-password">
                  <Text
                    color={textColorBrand}
                    fontSize="sm"
                    w="124px"
                    fontWeight="500"
                  >
                    Forgot password?
                  </Text>
                </Link> */}
            </Flex>
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

              {loading ? 'Signing...' : 'Sign In'}
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Link href="/signup">
              <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                Not registered yet?
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Create an Account
                </Text>
              </Text>
            </Link>
          </Flex>


        </Flex>
      </Flex>
      {message ? (
        <p className={`${activeclass} notify_message`}>{message}</p>
      ) : null}
    </div>
  );
}
