import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { ACCESS_APPLICATION } from '../../store/globalStateSlice';
import { selectAccessApplication } from '../../selectors/globalSelector';
import SomethingWrong from '../SomethingWrong';
import { PERMISSION_APPLICATIONS } from '../../store/applicationsSlice';
import { selectAccessApplications } from '../../selectors/applicationsSelector';

const HeadingValuesCreateApplication = {
  [ACCESS_APPLICATION.NoRight]: 'К сожалению, у вас нет права на замену лет',
  [ACCESS_APPLICATION.ToApply]: 'Свяжитесь с ОРЗПиИВ',
  [ACCESS_APPLICATION.NeedOriginalReference]: 'Необходим оригинал справки 182н',
  [ACCESS_APPLICATION.BestYears]: 'Текущее сочетание самое выгодное для вас',
  [ACCESS_APPLICATION.DataWrong]: 'Ошибка предоставленых данных с сервера',
};

const TextValuesCreateApplication = {
  [ACCESS_APPLICATION.NoRight]:
    'В двух предыдущих календарных годах вы не находились в отпуске по беременности и родам и/или по уходу за ребенком',
  [ACCESS_APPLICATION.ToApply]: `Ранее вы предоставили справку 182н, если вы находились в декрете или отпуске по уходу за ребенком у другого работодателя, пожалуйста, свяжитесь с Отделом расчёта заработной платы и иных выплат для уточнения возможности и порядка оформления заявления на замену лет для расчёта больничного
  </br></br>Вы можете оформить заявление на бумажном носителе и направить на почту <a href="mailto:rszp_iks@vtb.ru">rszp_iks@vtb.ru</a>`,
  [ACCESS_APPLICATION.NeedOriginalReference]:
    'Если в двух предыдущих годах, предшествующих году начала заболевания, вы работали у других работодателей и находились в отпуске по беременности и родам и/или по уходу за ребенком, то для расчёта больничного необходимо предоставить оригинал справки 182н в ОРЗПиИВ (г.Москва, Трубная, 2 к.511).',
  [ACCESS_APPLICATION.BestYears]:
    'В случае возникновения возможности для замены лет в будущем вы сможете обратиться к данному сервису.',
  [ACCESS_APPLICATION.DataWrong]:
    'Cервис получил данные, которые не овтечает условиям работы сервиса.',
};

const HeadingValuesApplications = {
  [PERMISSION_APPLICATIONS.NoApplications]: 'Заявки отсутствуют',
  [PERMISSION_APPLICATIONS.SomeThingWrong]: 'Что то не так!',
};

const TextValuesApplications = {
  [PERMISSION_APPLICATIONS.NoApplications]: '',
  [PERMISSION_APPLICATIONS.SomeThingWrong]: 'Попробуйте позже или обратитесь к в службу поддержки.',
};

interface IPermission {
  mode: 'create' | 'applications';
}

const Permission: FC<IPermission> = ({ children, mode }) => {
  const accessCreateApplication = useSelector(selectAccessApplication);
  const accessApplications = useSelector(selectAccessApplications);
  if (mode === 'create') {
    return (
      <>
        {accessCreateApplication ? (
          <SomethingWrong
            heading={HeadingValuesCreateApplication[accessCreateApplication]}
            text={TextValuesCreateApplication[accessCreateApplication]}
          />
        ) : (
          children
        )}
      </>
    );
  }
  if (mode === 'applications') {
    return (
      <>
        {accessApplications ? (
          <SomethingWrong
            heading={HeadingValuesApplications[accessApplications]}
            text={TextValuesApplications[accessApplications]}
          />
        ) : (
          children
        )}
      </>
    );
  }
  return null;
};

export default Permission;
