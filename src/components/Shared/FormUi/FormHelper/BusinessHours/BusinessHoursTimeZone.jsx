import React from 'react';
import moment from 'moment-timezone';
import { FormDropdown } from '../..';
import { BusinessHoursFieldWrapper } from 'components/Shared/SidebarUi';

function BusinessHoursTimeZone({ name }) {
  const dropdownOptions = React.useMemo(getTimeZoneOptions, []);
  return (
    <BusinessHoursFieldWrapper title='1. Time zone'>
      <FormDropdown
        label='Select the time zone of your Business.'
        labelVariant='h3'
        variant='custom'
        name={name}
        options={dropdownOptions}
      />
    </BusinessHoursFieldWrapper>
  );
}

export { BusinessHoursTimeZone };

function getTimeZoneOptions() {
  const timeZones = moment.tz.names();

  const timeZoneOptions = timeZones.map((zone) => {
    const offset = moment.tz(zone).format('Z');

    return {
      value: zone,
      label: `(UTC${offset}) ${zone.replace('_', ' ')}`,
    };
  });

  return timeZoneOptions;
}
