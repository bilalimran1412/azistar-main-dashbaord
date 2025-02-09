// App.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import MainApp from '../views/Main';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import MainAppLayout from 'components/Main';


const Canvas = () => {
  return (
    <Layout>

      <MainAppLayout/>
      {/* <BrowserRouter>
        <ChakraProvider>
          <MainAppLayout />
        </ChakraProvider>
      </BrowserRouter> */}
    </Layout>
  );
};

export default Canvas;
