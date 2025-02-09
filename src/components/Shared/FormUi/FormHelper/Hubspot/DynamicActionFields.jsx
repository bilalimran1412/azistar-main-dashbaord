import React from 'react';
import { useFormikContext } from 'formik';
import { renderer } from './SubFields/render';

function DynamicActionFields() {
  const { values } = useFormikContext();
  const selectedEvent = values?.event;
  const RenderFieldsContent = renderer(selectedEvent);

  return <RenderFieldsContent />;
}

export { DynamicActionFields };
