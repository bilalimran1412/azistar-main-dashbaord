import React from 'react';
import {
  FaFile,
  FaQuestionCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHashtag,
  FaFileUpload,
  FaSearch,
  FaLink,
  FaMapMarked,
} from 'react-icons/fa';
// You can import any icons you have or use a different icon library
import { FaFlag } from 'react-icons/fa';

const icons = {
  startingNode: <FaFlag />,
  customNode: <FaFile />,
  AskAQuestion: <FaQuestionCircle />,
  askName: <FaUser />,
  askEmail: <FaEnvelope />,
  askPhone: <FaPhone />,
  askNumber: <FaHashtag />,
  askFile: <FaFileUpload />,
  autoComplete: <FaSearch />,
  askUrl: <FaLink />,
  askAddress: <FaMapMarked />,
  picChoice: <FaFile />,
  rating: <FaFile />,
  uploadMedia: <FaFileUpload />,
};

export default icons;
