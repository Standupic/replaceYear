import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { ACCESS_APPLICATION } from '../../store/globalStateSlice';
import { selectAccessApplication } from '../../selectors/globalSelector';
import SomethingWrong from '../SomethingWrong';

const HeadingValues = {
  [ACCESS_APPLICATION.NoRight]: 'К сожалению, у вас нет права на замену лет',
  [ACCESS_APPLICATION.ToApply]: 'Свяжитесь с ОРЗПиИВ',
  [ACCESS_APPLICATION.NeedOriginalReference]: 'Необходим оригинал справки 182н',
  [ACCESS_APPLICATION.BestYears]: 'Текущее сочетание самое выгодное для вас',
  [ACCESS_APPLICATION.dataWrong]: 'Ошибка предоставленых данных с сервера',
};

const TextValues = {
  [ACCESS_APPLICATION.NoRight]:
    'В двух предыдущих календарных годах вы не находились в отпуске по беременности и родам и/или по уходу за ребенком',
  [ACCESS_APPLICATION.ToApply]: `Для уточнения возможности замены лет, Заявление необходимо оформить на бумажном носителе и направить на п/я ${process.env['REACT_APP_GET_TO_APPLY_ADDRESS']}.`,
  [ACCESS_APPLICATION.NeedOriginalReference]:
    'Если в двух предыдущих годах, предшествующих году начала заболевания, вы работали у других работодателей и находились в отпуске по беременности и родам и/или по уходу за ребенком, то для расчёта больничного необходимо предоставить оригинал справки 182н в ОРЗПиИВ (г.Москва, Трубная, 2 к.511).',
  [ACCESS_APPLICATION.BestYears]:
    'В случае возникновения возможности для замены лет в будущем вы сможете обратиться к данному сервису.',
  [ACCESS_APPLICATION.dataWrong]:
    'Cервис получил данные, которые не овтечает условиям работы сервиса.',
};

const Permission: FC = ({ children }) => {
  const accessApplication = useSelector(selectAccessApplication);
  return (
    <>
      {accessApplication ? (
        <SomethingWrong
          heading={HeadingValues[accessApplication]}
          text={TextValues[accessApplication]}
        />
      ) : (
        children
      )}
    </>
  );
};

export default Permission;
