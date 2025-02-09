import { FaFlag } from 'react-icons/fa';
import {
  FaFileAlt,
  FaToggleOn,
  FaCalendarAlt,
  FaSortNumericDown,
} from 'react-icons/fa';
import {
  FaBook,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaUniversity,
  FaClipboardList,
} from 'react-icons/fa';

export const buttonCreatorIcons = {
  book: FaBook,
  teacher: FaChalkboardTeacher,
  coding: FaLaptopCode,
  university: FaUniversity,
  checklist: FaClipboardList,
};

export const buttonCreatorEmojis = {
  smile: '😊',
  thumbsUp: '👍',
  heart: '❤️',
  star: '⭐',
  laugh: '😂',
};

export const possibleFormatOptions = {
  STRING: { icon: 'A', label: 'String', sample: 'John Smith' },
  BOOLEAN: { icon: 'B', label: 'Boolean' },
  NUMBER: { icon: 8, label: 'Number', sample: '3423003' },
  ARRAY: { icon: <FaSortNumericDown />, label: 'Array' },
  DATE: { icon: <FaCalendarAlt />, label: 'Date' },
};
export const groupedTypesWithIcons = {
  STRING: 'A',
  BOOLEAN: 'B',
  NUMBER: 8,
  AUTO_NUMBER: <FaSortNumericDown />,
  DATE: <FaCalendarAlt />,
  ARRAY: <FaSortNumericDown />,
};
export const leadDataOptions = [
  {
    value: 'id',
    label: 'ID',
    type: 'NUMBER',
    sample: 4213513453453,
    category: 'LEAD_DATA',
  },
  {
    value: 'name',
    label: 'Name',
    type: 'STRING',
    sample: 'John Smith',
    category: 'LEAD_DATA',
  },
  {
    value: 'email',
    label: 'Email',
    type: 'STRING',
    sample: 'email@tesla.com',
    category: 'LEAD_DATA',
  },
  {
    value: 'company',
    label: 'Company',
    type: 'STRING',
    sample: 'NASA',
    category: 'LEAD_DATA',
  },
  {
    value: 'phone',
    label: 'Phone',
    type: 'STRING',
    sample: '+34 690 708 181',
    category: 'LEAD_DATA',
  },
];

export const usageDetailsOptions = [
  {
    value: 'chat_transcription',
    label: 'Chat Transcription',
    type: 'STRING',
    readOnly: true,
    category: 'USAGE_DETAILS',
  },
  {
    value: 'online',
    label: 'Agents Online',
    type: 'BOOLEAN',
    sample: true,
    readOnly: true,
    category: 'USAGE_DETAILS',
  },
  {
    value: 'last_seen',
    label: 'Last Seen',
    type: 'DATE',
    sample: 'Oct 29, 20:36',
    readOnly: true,
    category: 'USAGE_DETAILS',
  },
  {
    value: 'created',
    label: 'Created',
    type: 'DATE',
    sample: 'Oct 27, 17:41',
    readOnly: true,
    category: 'USAGE_DETAILS',
  },
  {
    value: 'url',
    label: 'Url',
    type: 'STRING',
    sample: 'https://...',
    readOnly: true,
    category: 'USAGE_DETAILS',
  },
  {
    value: 'country',
    label: 'Country',
    type: 'STRING',
    sample: 'Spain',
    readOnly: true,
    category: 'USAGE_DETAILS',
  },
  {
    value: 'navigator',
    label: 'Browser',
    type: 'STRING',
    sample: 'Chrome',
    readOnly: true,
    category: 'USAGE_DETAILS',
  },
  {
    value: 'device',
    label: 'Device',
    type: 'STRING',
    sample: 'Other',
    readOnly: true,
    category: 'USAGE_DETAILS',
  },
  {
    value: 'os',
    label: 'OS',
    type: 'STRING',
    sample: 'Mac OS X',
    readOnly: true,
    category: 'USAGE_DETAILS',
  },
];

export const timeReferencesOptions = [
  {
    value: 'yesterday',
    label: 'Yesterday',
    type: 'DATE',
    sample: 'Yesterday',
    readOnly: true,
    category: 'TIME_REFERENCES',
  },
  {
    value: 'today',
    label: 'Today',
    type: 'DATE',
    sample: new Date(),
    readOnly: true,
    category: 'TIME_REFERENCES',
  },
  {
    value: 'tomorrow',
    label: 'Tomorrow',
    type: 'DATE',
    sample: 'Tomorrow',
    readOnly: true,
    category: 'TIME_REFERENCES',
  },
];

export const initialGroupedOptions = [
  {
    label: 'LEAD DATA',
    data: 'LEAD_DATA',
    options: leadDataOptions,
  },
  {
    label: 'USAGE DETAILS',
    data: 'USAGE_DETAILS',
    options: usageDetailsOptions,
  },
  {
    label: 'TIME REFERENCES',
    data: 'TIME_REFERENCES',
    options: timeReferencesOptions,
  },
  {
    label: 'CUSTOM VARIABLES',
    data: 'CUSTOM_VARIABLES',
    options: [],
  },
];

export const edgeType = 'baseEdge';
export const errorEdgeType = 'errorBaseEdge';
const buttonsList = {
  id: 'button1',
  label: 'Edit Button',
  icon: null,
  canBeDelete: false,
};

export const buttonNodeData = {
  items: [buttonsList],
};
export const sample = {
  nodes: [
    {
      id: '1',
      data: {
        label: 'This is our parent',
        buttons: [],
        contentType: 'startingNode',
        blockId: '1',
      },
      position: { x: 50, y: 100 },
      icon: { key: null, ref: null, props: {}, _owner: null, _store: {} },
      type: 'baseNode',
      measured: { width: 212, height: 76 },
      selected: false,
    },
    {
      id: '85195c21-c418-4e55-8ce7-85cbd619f97b',
      position: { x: 450, y: 100 },
      type: 'baseNode',
      data: {
        blockId: '6d7e4289-d701-52b3-a1c1-ffc8ba1d69f6',
        file: null,
        items: [],
        isReplaced: false,
      },
      measured: { width: 251, height: 76 },
      selected: false,
    },
    {
      id: '3c4bc004-3296-4bf0-8565-4328e2ba53d7',
      position: { x: 850, y: 100 },
      type: 'baseNode',
      data: {
        blockId: '4354fa96-574f-5723-9322-75164a27b81d',
        file: null,
        items: [],
        isReplaced: false,
      },
      measured: { width: 248, height: 76 },
      selected: false,
    },
    {
      id: 'a11103b2-4e65-44a4-b7b2-866e1f0b4a2a',
      position: { x: 1250, y: 100 },
      type: 'baseNode',
      data: {
        blockId: '567d4330-eba2-5eb8-8213-9fc397752a0c',
        file: null,
        items: [],
        isReplaced: false,
      },
      measured: { width: 258, height: 76 },
      selected: false,
    },
    {
      id: '36c3f13b-9410-4aaf-beb0-df70bc4bb987',
      position: { x: 60, y: 330 },
      type: 'baseNode',
      data: {
        blockId: '25e21d1a-f5ca-5df2-8fe4-36f6355506b7',
        file: null,
        items: [],
        isReplaced: false,
      },
      measured: { width: 261, height: 76 },
      selected: false,
      dragging: false,
    },
    {
      id: 'fc00c630-3e25-4f8b-8cbf-e3509e2038f7',
      position: { x: 330, y: 585 },
      type: 'baseNode',
      data: {
        blockId: '29d89034-306b-5feb-a242-e0cbe1c330d9',
        file: null,
        items: [],
        isReplaced: false,
      },
      measured: { width: 249, height: 76 },
      selected: false,
      dragging: false,
    },
    {
      id: 'e6637799-8c44-44b2-84a7-fea290ed6de3',
      position: { x: 720, y: 360 },
      type: 'baseNode',
      data: {
        multipleHandles: true,
        layoutType: 'button',
        contentType: 'buttonNode',
        items: [
          { id: 'button-1', label: 'Edit Button', isDeletable: false },
          { id: 1726413614376, label: 'Button' },
          { id: 1726413615014, label: 'Button' },
          { id: 1726413615927, label: 'Button' },
        ],
        blockId: '044e2870-b2fc-5377-9622-4ac0eea5acce',
        file: null,
        isReplaced: false,
      },
      measured: { width: 229, height: 259 },
      selected: false,
      dragging: false,
    },
    {
      id: '68840ba4-93fc-41d6-b1b3-3b6567b2388b',
      position: { x: 1215, y: 270 },
      type: 'baseNode',
      data: {
        blockId: '9d136442-9115-54b8-8a24-971b484f64e7',
        file: null,
        items: [],
        isReplaced: false,
      },
      measured: { width: 238, height: 76 },
      selected: false,
      dragging: false,
    },
    {
      id: 'e7600cae-1fd1-4f16-a2bb-5216c7304297',
      position: { x: 1215, y: 450 },
      type: 'baseNode',
      data: {
        contentType: 'placeHolderNodes',
        blockId: 'fc4bd563-8d62-5bc2-8a32-9452732899a5',
        file: null,
        items: [],
        isReplaced: false,
      },
      measured: { width: 253, height: 76 },
      selected: false,
      dragging: false,
    },
    {
      id: 'd5bd1042-d49f-4ce6-844e-85fbdae4651c',
      position: { x: 1185, y: 630 },
      type: 'baseNode',
      data: {
        blockId: '14647fb4-292e-5490-89eb-e925b7a89c40',
        file: null,
        items: [],
        isReplaced: false,
      },
      measured: { width: 257, height: 76 },
      selected: false,
      dragging: false,
    },
    {
      id: '7762490d-ecbd-4fed-af28-b99ee515e0f2',
      position: { x: 600, y: 360 },
      type: 'baseNode',
      data: {
        contentType: 'incomingOnly',
        blockId: 'e10a2810-3fe9-53bb-be38-c11dfa857e7d',
        file: null,
        items: [],
        isReplaced: false,
      },
      measured: { width: 274, height: 76 },
      selected: true,
      dragging: false,
    },
  ],
  edges: [
    {
      id: 'e1-85195c21-c418-4e55-8ce7-85cbd619f97b',
      source: '1',
      target: '85195c21-c418-4e55-8ce7-85cbd619f97b',
      animated: true,
      type: 'baseEdge',
      data: { isHover: false },
    },
    {
      id: 'e85195c21-c418-4e55-8ce7-85cbd619f97b-3c4bc004-3296-4bf0-8565-4328e2ba53d7',
      source: '85195c21-c418-4e55-8ce7-85cbd619f97b',
      target: '3c4bc004-3296-4bf0-8565-4328e2ba53d7',
      animated: true,
      type: 'baseEdge',
      data: { isHover: false },
    },
    {
      id: 'e3c4bc004-3296-4bf0-8565-4328e2ba53d7-a11103b2-4e65-44a4-b7b2-866e1f0b4a2a',
      source: '3c4bc004-3296-4bf0-8565-4328e2ba53d7',
      target: 'a11103b2-4e65-44a4-b7b2-866e1f0b4a2a',
      animated: true,
      type: 'baseEdge',
      data: { isHover: false },
    },
    {
      id: 'ea11103b2-4e65-44a4-b7b2-866e1f0b4a2a-36c3f13b-9410-4aaf-beb0-df70bc4bb987',
      source: 'a11103b2-4e65-44a4-b7b2-866e1f0b4a2a',
      target: '36c3f13b-9410-4aaf-beb0-df70bc4bb987',
      animated: true,
      type: 'baseEdge',
      data: { isHover: false },
    },
    {
      id: 'e36c3f13b-9410-4aaf-beb0-df70bc4bb987-fc00c630-3e25-4f8b-8cbf-e3509e2038f7',
      source: '36c3f13b-9410-4aaf-beb0-df70bc4bb987',
      target: 'fc00c630-3e25-4f8b-8cbf-e3509e2038f7',
      animated: true,
      type: 'baseEdge',
      data: { isHover: false },
    },
    {
      id: 'efc00c630-3e25-4f8b-8cbf-e3509e2038f7-e6637799-8c44-44b2-84a7-fea290ed6de3',
      source: 'fc00c630-3e25-4f8b-8cbf-e3509e2038f7',
      target: 'e6637799-8c44-44b2-84a7-fea290ed6de3',
      animated: true,
      type: 'baseEdge',
      data: { isHover: false },
    },

    {
      id: 'ee6637799-8c44-44b2-84a7-fea290ed6de3-d5bd1042-d49f-4ce6-844e-85fbdae4651c',
      source: 'e6637799-8c44-44b2-84a7-fea290ed6de3',
      target: 'd5bd1042-d49f-4ce6-844e-85fbdae4651c',
      animated: true,
      type: 'baseEdge',
      sourceHandle: 'source-placeholder-e6637799-8c44-44b2-84a7-fea290ed6de3',
      data: { isHover: false },
    },
    {
      id: 'ed5bd1042-d49f-4ce6-844e-85fbdae4651c-7762490d-ecbd-4fed-af28-b99ee515e0f2',
      source: 'd5bd1042-d49f-4ce6-844e-85fbdae4651c',
      target: '7762490d-ecbd-4fed-af28-b99ee515e0f2',
      animated: true,
      type: 'baseEdge',
    },
  ],
};
const blockList = [
  {
    name: 'Messages',
    block: ['Send a message', 'Media', 'Goodbye message'],
  },

  {
    name: 'Questions',
    block: [
      'Buttons',
      'Ask for a name',
      'Ask a question',
      'Ask for an email',
      'Ask for a number',
      'Ask for a phone',
      'Ask for a date',
      'Ask for a file',
      'Ask for an address',
      'Ask for a Url',
      'Picture choice',
      'Auto-complete',
      'Yes/No',
      'Rating',
      'Opinion scale',
      'Forms',
      'Multi-questions',
    ],
  },

  {
    name: 'Logic',
    block: [
      'Conditions',
      'Set a variable',
      'Keyword jump',
      'Global keywords',
      'Formulas',
      'Jump to',
      'Lead scoring',
      'Goal',
      'A/B test',
      'Persistent menu',
    ],
  },

  {
    name: 'Integration',
    block: [
      'Send an email',
      'Google sheets',
      'Zapier',
      'Airtable',
      'Dialogflow',
      'Hubspot',
      'Slack',
      'Calendly',
      'Stripe',
      'Google analytics',
      'Segment',
      'Salesforce',
      'Mailchimp',
    ],
  },

  {
    name: 'AI Assistant',
    block: ['AI faqs assistant', 'AI lead gen assistant'],
  },

  {
    name: 'Inbox and Builder Tools',
    block: [
      'Business hours',
      'Human takeover',
      'Close chat',
      'Bricks',
      'Add a note',
    ],
  },

  {
    name: 'Low Code',
    block: [
      'Webhook',
      'Trigger automation',
      'Code',
      'Code set',
      'Dynamic data',
    ],
  },
];

export const initialNode = {
  id: '1',
  data: {
    label: 'Starting Point',
    contentType: 'startingNode',
    params: {
      nodeTextContent: 'Where your bot begins',
    },
    blockId: '1',
  },
  position: { x: 50, y: 100 },
  type: 'baseNode',
};

export const menuItems = [
  { type: 'customNode', label: 'Buttons' },
  { type: 'AskAQuestion', label: 'Ask a question' },
  { type: 'askDate', label: 'Ask for a Date' },
  { type: 'askName', label: 'Ask for a name' },
  { type: 'askEmail', label: 'Ask for an email' },
  { type: 'askPhone', label: 'Ask for a phone' },
  { type: 'askNumber', label: 'Ask for a number' },
  { type: 'askFile', label: 'Ask for a file' },
  { type: 'autoComplete', label: 'Autocomplete' },
  { type: 'askUrl', label: 'Ask for a URL' },
  { type: 'askAddress', label: 'Ask for an address' },
  { type: 'picChoice', label: 'Picture choice' },
  { type: 'rating', label: 'Rating' },
  { type: 'uploadMedia', label: 'Upload a file' },
];
