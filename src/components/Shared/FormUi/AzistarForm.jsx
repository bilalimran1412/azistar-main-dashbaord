import React, { createContext, useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Flex } from '@chakra-ui/react';

const SchemaProviderContext = createContext({
  validationSchema: Yup.object().shape({}),
});

export const useSchemaContext = () => useContext(SchemaProviderContext);

export const SchemaProvider = ({ validationSchema, children }) => {
  const contextValue = { validationSchema };

  return (
    <SchemaProviderContext.Provider value={contextValue}>
      {children}
    </SchemaProviderContext.Provider>
  );
};

function onKeyDown(keyEvent) {
  if (keyEvent.code === 'Enter' || keyEvent.code === 'NumpadEnter') {
    keyEvent.preventDefault();
  }
}

function AzistarForm({
  children,
  initialValues,
  onSave,
  onReset,
  validationSchema = Yup.object().shape({}),
  enableReinitialize = true,
  containerProps = {},
  formID,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSave}
      validationSchema={validationSchema}
      enableReinitialize={enableReinitialize}
      onReset={onReset}
      validateOnMount

      // validateOnBlur={false}
      // validateOnChange={false}
    >
      <SchemaProvider validationSchema={validationSchema}>
        <Form onKeyDown={onKeyDown} id={formID}>
          <Flex
            height='100%'
            {...containerProps}
            gap='1.5rem'
            direction='column'
            flex={1}
          >
            {children}
          </Flex>
        </Form>
      </SchemaProvider>
    </Formik>
  );
}

export default AzistarForm;
