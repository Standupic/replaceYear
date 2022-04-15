import styled from 'styled-components';

export const Text = styled.p`
  font-size: 16px;
  color: #74777f;
  max-width: 280px;
  text-align: center;
  inline-size: ${(props: { isError: boolean }) => (props.isError ? 'auto' : '220px')};
`;

export const Heading = styled.h6`
  font-size: 18px;
`;

export const Center = styled.div`
  justify-items: center;
  align-items: center;
`;
