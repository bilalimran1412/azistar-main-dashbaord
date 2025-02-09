import React from 'react';
import { useFormikContext } from 'formik';
import { hubspotEvents, loadOptions } from './data';
import { FormReactSelect } from '../../FormUi';

const DynamicDropdown = React.memo(({ subFieldName, filterKey = '' }) => {
  const [options, setOptions] = React.useState([]);
  const { values } = useFormikContext();

  const selectedEvent = React.useMemo(
    () => hubspotEvents.find((event) => event.value === values?.event),
    [values?.event]
  );

  React.useEffect(() => {
    const type = filterKey || selectedEvent.key;
    const fetchOptions = async () => {
      const opt = await loadOptions(type);
      setOptions(opt);
    };

    if (type) {
      fetchOptions();
    }
  }, [filterKey, selectedEvent.key]);

  return <FormReactSelect name={`${subFieldName}`} options={options} />;
});

export { DynamicDropdown };
