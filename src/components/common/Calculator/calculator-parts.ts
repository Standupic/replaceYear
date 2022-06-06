import styled from 'styled-components';
import { IStyles } from '../../styledComponents/constants';
import PadBox from '../../styledComponents/PadBox';

interface IText {
  size?: string;
  fontWeight?: string;
  fontStyle?: string;
  color?: string;
  align?: string;
  isActive?: boolean;
  disable?: boolean;
}

export const Text = styled.p`
  font-size: ${(props: IText) => (props.size ? props.size : '1rem')};
  color: ${(props: IText) => props.color && props.color};
  font-weight: ${(props: IText) => (props.fontWeight ? props.fontWeight : 'normal')};
  line-height: 20px;
  text-align: ${(props: IText) => (props.align ? props.align : 'left')};
`;

export const Total = styled(Text as any)`
  font-weight: 500;
  font-size: 1.75rem;
`;

interface IPropsSum extends IStyles {
  width?: string;
  border?: string;
  color?: string;
  isActive?: boolean;
  theme: { able: { color: string; bg: string } };
}

export const SumBox = styled(PadBox as any).attrs(() => ({
  as: 'div',
  padding: ['md'],
}))`
  background: ${(props: IPropsSum) => (props.isActive ? '#3A85FF' : 'white')};
  border: ${(props: IPropsSum) => (props.border ? props.border : '1px solid #dde0e9')};
  border-radius: 16px;
  width: 410px;
  height: 96px;
`;

export const Reasonable = styled(PadBox as any).attrs(() => ({
  as: 'button',
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
  isActive?: boolean;
}

export const YearsBox = styled(PadBox as any).attrs(() => ({
  as: 'div',
  padding: ['sm'],
}))`
  background: ${(props: IYearsBoxProps) => (props.isActive ? '#EDF5FF' : '#F3F4F6')};
  border-radius: 16px;
  height: 112px;
`;

export const YearBox = styled.div`
  width: 38px;
  position: absolute;
  left: calc(50% - 16px);
  top: calc(50% - 10px);
`;

export const ButtonYear = styled(PadBox as any).attrs(() => ({
  as: 'button',
  padding: ['sm'],
}))`
  opacity: ${(props: { disabled?: boolean }) => (props.disabled ? '0.5' : '1')};
  border-radius: 8px;
  width: 32px;
  height: 32px;
  background: #ffffff;
  box-shadow: 0px 2px 6px 0px #193b6826;
  display: grid;
  align-items: center;
  cursor: ${(props: { disabled?: boolean }) => (props.disabled ? 'auto' : 'pointer')};
  svg {
    margin: 0 auto;
  }
`;

export const Line = styled.div`
  position: relative;
  &:after {
    height: 1px;
    background: #dde9ff;
    content: '';
    width: 100wh;
    position: absolute;
    left: -8px;
    right: -8px;
  }
`;

export const CurrentYear = styled(Text as any).attrs(() => ({
  as: 'div',
}))`
  position: relative;
  cursor: pointer;
`;

export const StatusInfoYear = styled.em`
  position: absolute;
  right: -50px;
  bottom: -14px;
  cursor: pointer;
`;

export const PopUpText = styled(Text as any).attrs(() => ({}))`
  font-size: 0.8rem;
  text-align: center;
`;

export const Link = styled(Text as any).attrs(() => ({
  as: 'a',
}))`
  color: #0062ff;
  font-weight: 500;
`;
