import React from 'react';

export const FullWidthIcon = ({ fill = '#BABBC8' }) => (
  <svg
    width='14'
    height='12'
    viewBox='0 0 12 10'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect width='15' height='10' fill={fill}></rect>
  </svg>
);

export const HalfWidthIcon = ({ fill = '#BABBC8' }) => (
  <svg
    width='14'
    height='12'
    viewBox='0 0 12 10'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect width='5' height='10' fill={fill}></rect>
    <rect x='7' width='5' height='10' fill={fill}></rect>
  </svg>
);

export const TwoThirdsLeftIcon = ({ fill = '#BABBC8' }) => (
  <svg
    width='14'
    height='12'
    viewBox='0 0 12 10'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect width='3' height='10' fill={fill}></rect>
    <rect x='5' width='7' height='10' fill={fill}></rect>
  </svg>
);

export const TwoThirdsRightIcon = ({ fill = '#BABBC8' }) => (
  <svg
    width='14'
    height='12'
    viewBox='0 0 12 10'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <rect
      width='3'
      height='10'
      transform='matrix(-1 0 0 1 12 0)'
      fill={fill}
    ></rect>
    <rect
      width='7'
      height='10'
      transform='matrix(-1 0 0 1 7 0)'
      fill={fill}
    ></rect>
  </svg>
);
