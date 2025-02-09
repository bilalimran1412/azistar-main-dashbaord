import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import theme from './config/theme';
import MainApp from './views/Main';

const App = () => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <MainApp />
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;
