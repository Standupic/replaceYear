import React, { FC, useState } from 'react';
import { StatusInfoOutline } from 'juicyfront/indexIcon';
import { Toast } from 'juicyfront';
import { Inline, Stack } from '../../styledComponents';
import { KEY_SPACING } from '../../styledComponents/constants';
import { ReactComponent as ArrowLeftSVG } from '../../../assets/images/arrow-left.svg';
import { ReactComponent as ArrowRightSVG } from '../../../assets/images/arrow-right.svg';
import PopUp from './PopUp';
import { ButtonYear, Line, CurrentYear, StatusInfoYear, PopUpText } from './calculator-parts';

interface IYearProps {
  disable?: boolean;
  year: string;
  income?: string;
}

const infoStyle: React.CSSProperties | undefined = {
  top: '-17px',
  left: '135px',
  width: '197px',
  height: '56px',
};

const currentYearStyle: React.CSSProperties | undefined = {
  top: '33px',
  left: '155px',
  width: '207px',
  height: '40px',
};

const YearActive: FC<IYearProps> = ({ disable = false, year, income }) => {
  const currentYearRef = React.useRef(null);
  const statusInfoRef = React.useRef(null);
  const [isVisibleInfo, setVisibleInfo] = useState<boolean>(false);
  const [isVisibleInCome, setVisibleInCome] = useState<boolean>(false);
  return (
    <Inline index={1} align={'center'} justify={'center'} height={'39px'}>
      {!disable && (
        <ButtonYear>
          <ArrowLeftSVG />
        </ButtonYear>
      )}
      <CurrentYear
        ref={currentYearRef}
        align={'center'}
        size={'1.1rem'}
        disable={disable}
        color={disable ? '#B1B5BB' : '#000'}
        onMouseOver={() => {
          setVisibleInCome(true);
        }}
        onMouseLeave={() => {
          setVisibleInCome(false);
        }}>
        {year}
        {disable && (
          <StatusInfoYear
            ref={statusInfoRef}
            onMouseOver={() => {
              setVisibleInfo(true);
            }}
            onMouseLeave={() => {
              setVisibleInfo(false);
            }}>
            <StatusInfoOutline size={'xxs'} />
            <PopUp
              isVisible={isVisibleInfo}
              text={`В ${year} году не было длительного отсутствия`}
              currentRef={statusInfoRef}
              style={infoStyle}
            />
          </StatusInfoYear>
        )}
        {!disable && (
          <PopUp
            text={`Расчётная база: ${income}`}
            isVisible={isVisibleInCome}
            currentRef={currentYearRef}
            style={currentYearStyle}
          />
        )}
      </CurrentYear>
      {!disable && (
        <ButtonYear>
          <ArrowRightSVG />
        </ButtonYear>
      )}
    </Inline>
  );
};

interface IYearNotActiveProps {
  year: number;
}

const YearNotActive: FC<IYearNotActiveProps> = ({ year }) => {
  return (
    <Inline index={1} align={'center'} justify={'center'} height={'39px'}>
      <CurrentYear align={'center'} size={'1.1rem'} color={'#74777f'}>
        {year}
      </CurrentYear>
    </Inline>
  );
};

export { YearActive, YearNotActive };
