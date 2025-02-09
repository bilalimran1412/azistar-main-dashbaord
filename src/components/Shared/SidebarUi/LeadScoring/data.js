export const conditionsOptions = {
  ARRAY: [
    {
      value: 'CONTAINS',
      label: 'Contains',
      args: 1,
      fn: 'Contains',
    },
    {
      value: 'OMITS',
      label: 'Does not contain',
      args: 1,
      fn: 'NotContain',
    },
  ],
  BOOLEAN: [
    {
      value: 'EQUALS',
      label: 'Equals to',
      args: 1,
      fn: 'IsEqual',
    },
    {
      value: 'NOT_EQUAL',
      label: 'Not equal to',
      args: 1,
      fn: 'IsNotEqual',
    },
  ],
  DATE: [
    {
      value: 'ON',
      label: 'On',
      args: 1,
      fn: 'IsEqual',
    },
    {
      value: 'BEFORE',
      label: 'Before',
      args: 1,
      fn: 'IsLess',
    },
    {
      value: 'AFTER',
      label: 'After',
      args: 1,
      fn: 'IsGreater',
    },
    {
      value: 'BETWEEN',
      label: 'Between',
      args: 2,
      fn: 'Between',
    },
  ],
  AUTO_NUMBER: [
    {
      value: 'EQUALS',
      label: '=',
      args: 1,
      fn: 'IsEqual',
    },
    {
      value: 'NOT_EQUAL',
      label: '≠',
      args: 1,
      fn: 'IsNotEqual',
    },
    {
      value: 'LESS_OR_EQUAL',
      label: '< or =',
      args: 1,
      fn: 'IsLessOrEqual',
    },
    {
      value: 'LESS',
      label: '<',
      args: 1,
      fn: 'IsLess',
    },
    {
      value: 'GREATER',
      label: '>',
      args: 1,
      fn: 'IsGreater',
    },
    {
      value: 'GREATER_OR_EQUAL',
      label: '> or =',
      args: 1,
      fn: 'IsGreaterOrEqual',
    },
    {
      value: 'BETWEEN',
      label: 'Between',
      args: 2,
      fn: 'Between',
    },
  ],
  STRING: [
    {
      value: 'EQUALS',
      label: 'Equals to',
      args: 1,
      fn: 'IsEqual',
    },
    {
      value: 'NOT_EQUAL',
      label: 'Not equal to',
      args: 1,
      fn: 'IsNotEqual',
    },
    {
      value: 'CONTAINS',
      label: 'Contains',
      args: 1,
      fn: 'Contains',
    },
    {
      value: 'OMITS',
      label: 'Does not contain',
      args: 1,
      fn: 'NotContain',
    },
  ],
  UNKNOWN: [
    {
      value: 'IS_SET',
      label: 'Is set',
      args: 0,
      fn: 'IsSet',
    },
    {
      value: 'IS_NOT_SET',
      label: 'Is not set',
      args: 0,
      fn: 'IsNotSet',
    },
  ],
};

export const SAMPLE_DROPDOWN_OPTIONS = [
  {
    value: 'INCLUDES',
    label: 'Includes ARRAY',
    type: 'ARRAY',
  },
  {
    value: 'EXCLUDES',
    label: 'Excludes ARRAY',
    type: 'ARRAY',
  },

  {
    value: 'IS_TRUE',
    label: 'Is True BOOLEAN',
    type: 'BOOLEAN',
  },
  {
    value: 'IS_FALSE',
    label: 'Is False BOOLEAN',
    type: 'BOOLEAN',
  },

  {
    value: 'AT',
    label: 'At DATE',
    type: 'DATE',
  },
  {
    value: 'NOT_BEFORE',
    label: 'Not Before DATE',
    type: 'DATE',
  },
  {
    value: 'NOT_AFTER',
    label: 'Not After DATE',
    type: 'DATE',
  },
  {
    value: 'WITHIN',
    label: 'Within DATE',
    type: 'DATE',
  },

  {
    value: 'EXACTLY',
    label: 'Exactly AUTO_NUMBER',
    type: 'AUTO_NUMBER',
  },
  {
    value: 'NOT_EXACTLY',
    label: 'Not Exactly AUTO_NUMBER',
    type: 'AUTO_NUMBER',
  },
  {
    value: 'UP_TO',
    label: 'Up to AUTO_NUMBER',
    type: 'AUTO_NUMBER',
  },
  {
    value: 'BELOW',
    label: 'Below AUTO_NUMBER',
    type: 'AUTO_NUMBER',
  },
  {
    value: 'ABOVE',
    label: 'Above AUTO_NUMBER',
    type: 'AUTO_NUMBER',
  },
  {
    value: 'AT_LEAST',
    label: 'At Least AUTO_NUMBER',
    type: 'AUTO_NUMBER',
  },
  {
    value: 'IN_RANGE',
    label: 'In Range AUTO_NUMBER',
    type: 'AUTO_NUMBER',
  },

  {
    value: 'MATCHES',
    label: 'Matches STRING',
    type: 'STRING',
  },
  {
    value: 'DOES_NOT_MATCH',
    label: 'Does Not Match STRING',
    type: 'STRING',
  },
  {
    value: 'INCLUDES_STRING',
    label: 'String Includes',
    type: 'STRING',
  },
  {
    value: 'EXCLUDES_STRING',
    label: 'String Excludes',
    type: 'STRING',
  },

  {
    value: 'EXISTS',
    label: 'Exists UNKNOWN',
    type: 'UNKNOWN',
  },
  {
    value: 'DOES_NOT_EXIST',
    label: 'Does Not Exist UNKNOWN',
    type: 'UNKNOWN',
  },
];
export const getLabel = (value) =>
  SAMPLE_DROPDOWN_OPTIONS.find((option) => option.value === value);
