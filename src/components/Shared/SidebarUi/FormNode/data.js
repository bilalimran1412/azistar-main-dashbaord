import { sideViewLayoutType } from '../../../../config/nodeConfigurations';import {
  FaCalculator,
  FaEnvelope,
  FaPhone,
  FaQuestionCircle,
  FaRegCalendarAlt,
} from 'react-icons/fa';

export const questionTypes = [
  {
    title: 'Ask a Question',
    label: 'Ask anything',
    icon: FaQuestionCircle,
    layoutType: sideViewLayoutType.askQuestion,
  },
  {
    title: 'Ask for an email',
    label: "What's your email",
    icon: FaEnvelope,
    layoutType: sideViewLayoutType.askEmail,
  },
  {
    title: 'Ask for a number',
    label: 'Type a number',
    icon: FaCalculator,
    layoutType: sideViewLayoutType.askNumber,
  },
  {
    title: 'Ask for a phone',
    label: "What's your number?",
    icon: FaPhone,
    layoutType: sideViewLayoutType.askPhone,
  },
  {
    title: 'Ask for a date',
    label: 'Select a date',
    icon: FaRegCalendarAlt,
    layoutType: sideViewLayoutType.date,
  },
];
