import styled from 'styled-components';
import { IStyles } from '../../styledComponents/constants';
import PadBox from '../../styledComponents/PadBox';

interface IText {
  size?: string;
  fontWeight?: string;
  fontStyle?: string;
  color?: string;
}

export const Text = styled.p`
  font-size: ${(props: IText) => (props.size ? props.size : '1rem')};
  color: ${(props: IText) => (props.color ? props.color : '#74777f')};
  font-weight: ${(props: IText) => (props.fontWeight ? props.fontWeight : 'normal')};
  line-height: 20px;
`;

export const Total = styled(Text as any)`
  font-weight: 500;
  font-size: 2rem;
`;

interface IPropsSum extends IStyles {
  width?: string;
  border?: string;
  color?: string;
  bg?: string;
  theme: { able: { color: string; bg: string } };
}

export const SumBox = styled(PadBox as any).attrs(() => ({
  as: 'div',
  padding: ['lg'],
}))`
  background: ${(props: IPropsSum) => (props.bg ? props.bg : 'white')};
  border: ${(props: IPropsSum) => (props.border ? props.border : '1px solid #dde0e9')};
  border-radius: 16px;
  width: 410px;
`;

export const Reasonable = styled(PadBox as any).attrs(() => ({
  as: 'div',
  padding: ['xs', 'sm', 'xs', 'sm'],
}))`
  color: #0062ff;
  background: #ffffff;
  font-size: 0.8rem;
  font-style: normal;
  border-radius: 16px;
`;

export const Different = styled(PadBox as any).attrs(() => ({
  as: 'div',
  padding: ['xs', 'sm'],
}))`
  color: red;
  font-size: 0.8rem;
  background: #ffffff;
  border-radius: 16px;
`;

interface IYearsBoxProps {
  bg?: string;
}

export const YearsBox = styled(PadBox as any).attrs(() => ({
  as: 'div',
  padding: ['lg'],
}))`
  background: ${(props: IYearsBoxProps) => (props.bg ? props.bg : '#F3F4F6')};
  border-radius: 16px;
`;

export const ButtonYear = styled(PadBox as any).attrs(() => ({
  as: 'div',
  padding: ['sm'],
}))`
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0px 2px 6px 0px #193b6826;
`;
