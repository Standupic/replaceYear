import styled from 'styled-components';
import { spacingMap, KEY_SPACING } from '../constants';

interface IPropsStack {
  gutter?: KEY_SPACING;
}

const Stack = styled.div`
  display: grid;
  gap: ${(props: IPropsStack) =>
    props.gutter ? spacingMap[props.gutter] : spacingMap[KEY_SPACING.lg]};
`;

export default Stack;
