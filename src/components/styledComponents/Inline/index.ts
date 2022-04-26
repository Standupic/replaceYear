import styled, { css } from 'styled-components';
import InlineCluster from '../InlineCluster';
import { STRETCH_KEY, stretchMap } from '../constants';

interface InlineProps extends IResponsive {
  stretch: STRETCH_KEY;
  index?: number;
}

const responsive = css`
  --switchAt: ${(props: IResponsive) => props.width};
  flex-wrap: wrap;
  & > * {
    min-width: fit-content;
    flex-basis: calc((var(--switchAt) - (100% - var(--gutter))) * 999);
  }
`;

const Inline = styled(InlineCluster as any)`
  flex-wrap: nowrap;
  ${(props: InlineProps) => {
    if (props.index) return `> :nth-child(${props.index + 1}) { flex: 1 }`;
    return stretchMap[props.stretch] ?? '';
  }}
  ${(props: InlineProps) => props.width && responsive};
`;

interface IResponsive {
  width: string;
}

export default Inline;
