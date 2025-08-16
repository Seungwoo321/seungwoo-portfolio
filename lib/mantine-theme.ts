import { createTheme, MantineColorsTuple } from '@mantine/core';

// 1991년 3월 21일생 양자리/신금년 색상 테마
const primaryColor: MantineColorsTuple = [
  '#fff4ed',
  '#ffe4d5',
  '#ffc4a3',
  '#ffa370',
  '#ff823d',
  '#ff6b35',
  '#cc4414',
  '#992f0a',
  '#661f07',
  '#331003'
];

export const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: primaryColor,
  },
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif',
  headings: {
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif',
  },
  defaultRadius: 'md',
  black: '#000',
  white: '#fff',
  other: {
    transitions: {
      fast: '150ms ease',
      normal: '200ms ease',
      slow: '300ms ease',
    },
  },
});