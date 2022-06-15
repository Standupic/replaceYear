import React, { FC } from 'react';
import { Card } from 'juicyfront';
import { IUser } from 'juicyfront/types/projects.types';
import { useHistory } from 'react-router-dom';
import { IApplicationsMapped } from '../../../store/applicationsSlice';

export type IScenarioStage = 'INIT' | 'DISPLAY';

const ApplicationCard: FC<IApplicationsMapped> = (props) => {
  const { id, date, requestNumber, title, statusText, statusColor, user, scenarioStage } = props;
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
          history.push(`/replaceyears/draft/${id}`);
        }
      }}
    />
  );
};

export default ApplicationCard;
