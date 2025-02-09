const commonFields = {
  placeholder: {
    label: 'Placeholder',
    name: 'placeholder',
    type: 'textfield',
    placeholder: 'Placeholder',
    value: '',
  },
  helpText: {
    label: 'Help Text',
    type: 'textfield',
    name: 'helpText',
    placeholder: 'Help Text',
    value: '',
  },
  defaultValue: {
    label: 'Default Value',
    type: 'textfield',
    placeholder: 'Default Value',
    name: 'defaultValue',
    value: '',
  },
  columnWidth: {
    label: 'Column Width',
    type: 'dropdown',
    placeholder: '',
    name: 'className',
    value: '',
  },
  minChars: {
    label: 'Minimum Characters',
    type: 'textfield',
    placeholder: '',
    name: 'min',
    value: '',
  },
  maxChars: {
    label: 'Maximum Characters',
    type: 'textfield',
    placeholder: '',
    name: 'max',
    value: '',
  },
  regexPattern: {
    label: 'Input Validation (Regex Pattern)',
    type: 'textfield',
    placeholder: '',
    name: 'pattern',
    value: '',
  },
};

const specificFields = {
  minValue: {
    label: 'Minimum Value',
    type: 'textfield',
    name: 'min',
    placeholder: '',
    value: '',
  },
  maxValue: {
    label: 'Maximum Value',
    type: 'textfield',
    placeholder: '',
    name: 'max',
    value: '',
  },
};

const formFields = {
  text: [
    commonFields.placeholder,
    commonFields.helpText,
    commonFields.defaultValue,
    commonFields.columnWidth,
    commonFields.minChars,
    commonFields.maxChars,
    commonFields.regexPattern,
  ],
  date: [
    commonFields.placeholder,
    commonFields.helpText,
    commonFields.defaultValue,
    commonFields.columnWidth,
    specificFields.minValue,
    specificFields.maxValue,
    commonFields.regexPattern,
  ],
  color: [
    commonFields.placeholder,
    commonFields.helpText,
    commonFields.defaultValue,
    commonFields.columnWidth,
    commonFields.regexPattern,
  ],
  textarea: [
    commonFields.placeholder,
    commonFields.helpText,
    commonFields.defaultValue,
    commonFields.columnWidth,
    commonFields.minChars,
    commonFields.maxChars,
  ],
  checkbox: [commonFields.helpText, commonFields.columnWidth],
};

export const getFieldsByType = (type) => {
  switch (type) {
    case 'text':
    case 'email':
    case 'tel':
    case 'url':
    case 'time':
      return formFields.text;
    case 'date':
    case 'number':
    case 'week':
      return formFields.date;
    case 'color':
      return formFields.color;
    case 'textarea':
      return formFields.textarea;
    case 'radio':
    case 'checkbox':
    case 'select':
      return formFields.checkbox;
    default:
      return [];
  }
};
export const multiQuestionTypeOptions = [
  { value: 'text', label: 'text' },
  { value: 'email', label: 'email' },
  { value: 'tel', label: 'tel' },
  { value: 'url', label: 'url' },
  { value: 'time', label: 'time' },
  { value: 'date', label: 'date' },
  { value: 'number', label: 'number' },
  { value: 'week', label: 'week' },
  { value: 'color', label: 'color' },
  { value: 'textarea', label: 'textarea' },
  { value: 'checkbox', label: 'checkbox' },
  { value: 'radio', label: 'radio' },
  { value: 'select', label: 'select' },
];

export const columnWidthOptions = [
  { value: 'full', label: 'Full' },
  { value: 'half', label: '1/2' },
  { value: 'one-third', label: '1/3' },
  { value: 'two-thirds', label: '2/3' },
];
