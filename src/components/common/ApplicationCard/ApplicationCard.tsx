import React, { FC } from 'react';
import { Card } from 'juicyfront';
import { IUser } from 'juicyfront/types/projects.types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IApplicationMapped } from '../../../store/applicationsSlice';
import { computingDraftApplication } from '../../../store/calculatorSlice';

export type IScenarioStage = 'INIT' | 'DISPLAY';

const ApplicationCard: FC<IApplicationMapped> = (props) => {
  const { id, date, requestNumber, title, statusText, statusColor, user, scenarioStage, initData } =
    props;
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <Card
      id={id}
      date={date}
      requestNumber={requestNumber}
      title={title}
      users={user ? [user] : ([] as IUser[])}
      statusColor={statusColor}
      statusText={statusText}
      onClick={(_, id) => {
        if (scenarioStage === 'DISPLAY') {
          history.push(`/replaceyears/application/${id}`);
        }
        if (scenarioStage === 'INIT') {
          dispatch(computingDraftApplication({ ...initData, id: id }));
          history.push(`/replaceyears`);
        }
      }}
    />
  );
};

export default ApplicationCard;
