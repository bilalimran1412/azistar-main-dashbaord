import { truncateString } from './string';

const groupBy = (array, key) => {
  return array.reduce((acc, item) => {
    const groupKey = item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
};

export { groupBy };

export function getDropdownOptions(response) {
  const options = [];

  options.push({
    label: truncateString(`Entire Response Body - ${JSON.stringify(response)}`),
    value: `EntireResponseBody_${JSON.stringify(response)}`,
  });

  function traverse(obj, prefix = '') {
    Object.keys(obj).forEach((key) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (Array.isArray(value)) {
        options.push({
          label: truncateString(`${fullKey} - ${JSON.stringify(value)}`),
          value: `${fullKey}_${JSON.stringify(value)}`,
        });

        value.forEach((item, index) => {
          const arrayKey = `${fullKey}[${index}]`;
          if (typeof item === 'object' && item !== null) {
            traverse(item, arrayKey);
          } else {
            options.push({
              label: truncateString(`${arrayKey} - ${item}`),
              value: `${arrayKey}_${item}`,
            });
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        options.push({
          label: truncateString(`${fullKey} - ${JSON.stringify(value)}`),
          value: `${fullKey}_${JSON.stringify(value)}`,
        });

        traverse(value, fullKey);
      } else {
        options.push({
          label: truncateString(`${fullKey} - ${value}`),
          value: `${fullKey}_${value}`,
        });
      }
    });
  }

  traverse(response);
  return options;
}
