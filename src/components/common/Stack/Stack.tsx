import styled from 'styled-components';
import { Center } from '../Modal/Modal-parts';

export enum IKeySpacingMap {
  'xs' = 'xs',
  'sm' = 'sm',
  'md' = 'md',
  'lg' = 'lg',
  'xl' = 'xl',
  'xxl' = 'xxl',
}

type ISpacingMap = Record<IKeySpacingMap, string>;

const spacingMap: ISpacingMap = {
  xs: '0.125rem',
  sm: '0.25rem',
  md: '0.8rem',
  lg: '1rem',
  xl: '1.5rem',
  xxl: '4rem',
};

interface IProps {
  gutter: IKeySpacingMap;
  width: string;
}

const Stack = styled(Center as any)`
  display: grid;
  gap: ${(props: IProps) => spacingMap[props.gutter] ?? spacingMap.lg};
  width: ${(props: IProps) => props.width ?? 'auto'};
`;

export default Stack;
