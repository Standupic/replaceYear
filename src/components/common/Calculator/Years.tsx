import React, { FC, useState } from 'react';
import { StatusInfoOutline } from 'juicyfront/indexIcon';
import { useDispatch } from 'react-redux';
import { Inline } from '../../styledComponents';
import { ReactComponent as ArrowLeftSVG } from '../../../assets/images/arrow-left.svg';
import { ReactComponent as ArrowRightSVG } from '../../../assets/images/arrow-right.svg';
import { decrementYear, incrementYear, YEARS_KEY } from '../../../store/calculatorSlice';
import { getCurrency } from '../../../helpers';
import PopUp from './PopUp';
import { ButtonYear, CurrentYear, StatusInfoYear, YearBox } from './calculator-parts';

interface IYearProps {
  disabled?: boolean;
  year?: number;
  income: number;
  controller: { left: boolean; right: boolean };
  type: YEARS_KEY;
}

const infoStyle: React.CSSProperties | undefined = {
  top: '-17px',
  left: '135px',
  width: '197px',
  height: '56px',
};

const currentYearStyle: React.CSSProperties | undefined = {
  top: '15px',
  left: '155px',
  width: '207px',
  height: '40px',
};

const YearActive: FC<IYearProps> = ({
  disabled: disabled = false,
  year,
  income,
  type,
  controller,
}) => {
  const currentYearRef = React.useRef(null);
  const statusInfoRef = React.useRef(null);
  const [isVisibleInfo, setVisibleInfo] = useState<boolean>(false);
  const [isVisibleInCome, setVisibleInCome] = useState<boolean>(false);
  const dispatch = useDispatch();
  return (
    <Inline stretch={1} align={'center'} justify={'center'} height={'39px'} position={'relative'}>
      {!disabled && (
        <ButtonYear
          disabled={!controller.left}
          onClick={() => {
            dispatch(decrementYear(type));
          }}>
          <ArrowLeftSVG />
        </ButtonYear>
      )}
      <CurrentYear
        ref={currentYearRef}
        align={'center'}
        size={'1.1rem'}
        disable={disabled}
        color={disabled ? '#B1B5BB' : '#000'}
        onMouseOver={() => {
          setVisibleInCome(true);
        }}
        onMouseLeave={() => {
          setVisibleInCome(false);
        }}>
        <YearBox>{year}</YearBox>
        {disabled && (
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
        {!disabled && (
          <PopUp
            text={`Расчётная база: ${income > 0 ? getCurrency(income) : 0}`}
            isVisible={isVisibleInCome}
            currentRef={currentYearRef}
            style={currentYearStyle}
          />
        )}
      </CurrentYear>
      {!disabled && (
        <ButtonYear
          disabled={!controller.right}
          onClick={() => {
            dispatch(incrementYear(type));
          }}>
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
