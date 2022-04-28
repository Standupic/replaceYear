import { StatusInfoOutline } from 'juicyfront/indexIcon';
import { Toast } from 'juicyfront';
import React, { FC } from 'react';
import { PopUpText, StatusInfoYear } from './calculator-parts';

interface IPopUpProps {
  currentRef: React.MutableRefObject<null>;
  isVisible: boolean;
  text: string;
  style?: React.CSSProperties;
}

const PopUp: FC<IPopUpProps> = ({ text, isVisible, currentRef, style }) => {
  return (
    <Toast
      setVisibility={() => {
        return null;
      }}
      containerRef={currentRef}
      style={style}
      isVisible={isVisible}>
      <PopUpText>{text}</PopUpText>
    </Toast>
  );
};

export default PopUp;
