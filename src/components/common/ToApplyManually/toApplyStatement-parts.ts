import styled from 'styled-components';
import PadBox from '../../styledComponents/PadBox';

export const ButtonDownLoad = styled(PadBox as any).attrs(() => ({
  as: 'button',
  padding: ['sm'],
}))`
  border-radius: 6px;
  background: #0d69f2;
  display: grid;
  height: 40px;
  font-size: 1rem;
  align-items: center;
  color: #ffffff;
  cursor: ${(props: { disabled?: boolean }) => (props.disabled ? 'auto' : 'pointer')};
`;
