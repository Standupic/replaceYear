import styled from 'styled-components';
import React, { CSSProperties, FC, HTMLAttributes } from 'react';

export const spacingMap: ISpacingMap = {
  xs: '0.125rem',
  sm: '0.25rem',
  md: '0.8rem',
  lg: '1rem',
  xl: '1.5rem',
  xxl: '4rem',
};

export enum IKeySpacingMap {
  'xs' = 'xs',
  'sm' = 'sm',
  'md' = 'md',
  'lg' = 'lg',
  'xl' = 'xl',
  'xxl' = 'xxl',
}

type ISpacingMap = Record<IKeySpacingMap, string>;

export const Center = styled.div`
  justify-items: center;
  align-items: center;
  display: grid;
`;

interface IPropsHeading extends HTMLAttributes<HTMLHeadingElement> {
  level?: keyof JSX.IntrinsicElements;
  size?: string;
}

const StyledHeading = styled.h1`
  font-style: normal;
  font-size: ${(props: { size?: string }) => (props.size ? `${props.size}` : '32px')};
  color: ${(props: { color?: string }) => (props.color ? `${props.color}` : 'black')};
`;

export const Heading: FC<IPropsHeading> = ({ level, ...rest }) => {
  return (
    <>
      <StyledHeading {...rest} as={level} />
    </>
  );
};

interface IPropsInline {
  gutter: IKeySpacingMap;
}

export const Inline = styled.div`
  display: flex;
  flex-items: flex-start;
  justify-content: flex-start;
  align-items: center;
  gap: ${(props: IPropsInline) => spacingMap[props.gutter] ?? spacingMap.lg};
`;

interface IPropsStack {
  gutter?: IKeySpacingMap;
  width?: string;
  justify?: string;
  align?: string;
}

export const Stack = styled.div`
  display: grid;
  justify-items: ${(props: IPropsStack) => props.justify ?? 'normal'};
  align-items: ${(props: IPropsStack) => props.align ?? 'normal'};
  gap: ${(props: IPropsStack) => (props.gutter ? spacingMap[props.gutter] : spacingMap.lg)};
  width: ${(props: IPropsStack) => props.width ?? '100%'};
`;

export const Container = styled.div`
  width: ${(props: CSSProperties) => props.width ?? '100%'};
  height: ${(props: CSSProperties) => props.height ?? '100%'};
`;

export const Card = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 2px 6px 0px #193b6826;
  padding: 20px;
`;

export const Box = styled.div`
  padding: ${(props: CSSProperties) => props.padding ?? 'auto'};
`;
