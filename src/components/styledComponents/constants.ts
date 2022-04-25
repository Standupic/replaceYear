type TypeSpacingMap = Record<KEY_SPACING, string>;

export enum KEY_SPACING {
  'zero' = '0',
  'xs' = 'xs',
  'sm' = 'sm',
  'md' = 'md',
  'lg' = 'lg',
  'xl' = 'xl',
  'xxl' = 'xxl',
}

export const spacingMap: TypeSpacingMap = {
  ['0']: '0',
  xs: '0.125rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '2rem',
  xxl: '2.5rem',
};

export enum KEY_FRACTION {
  '1/4' = '1/4',
  '1/3' = '1/3',
  '1/2' = '1/2',
  '2/3' = '2/3',
  '3/4' = '3/4',
  'auto-start' = 'auto-start',
  'auto-end' = 'auto-end',
}

export type TypeFractionsMap = Record<KEY_FRACTION, string>;

export const fractions: TypeFractionsMap = {
  '1/4': '1fr 3fr',
  '1/3': '1fr 2fr',
  '1/2': '1fr 1fr',
  '2/3': '2fr 1fr',
  '3/4': '3fr 1fr',
  'auto-start': 'auto 1fr',
  'auto-end': '1fr auto',
};

export enum KEY_JUSTIFYING {
  start = 'start',
  end = 'end',
  center = 'center',
}

type JUSTIFY_VALUE = 'flex-start' | 'flex-end' | 'center';

export type TypeJustifyMap = Record<KEY_JUSTIFYING, JUSTIFY_VALUE>;

export const justifyAlignMap: TypeJustifyMap = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
};

export type WRAP_VALUE = 'wrap' | 'nowrap';

export interface IStyles {
  gutter?: KEY_SPACING;
  padding?: KEY_SPACING[];
}
