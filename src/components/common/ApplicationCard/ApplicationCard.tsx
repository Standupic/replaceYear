import React, { FC } from 'react';
import { Card } from 'juicyfront';
import { useSelector } from 'react-redux';
import { IUser } from 'juicyfront/types/projects.types';
import { useHistory } from 'react-router-dom';
import { selectUser } from '../../../selectors/userSelector';
import { IApplicationMapped } from '../../../store/applicationsSlice';

const ApplicationCard: FC<IApplicationMapped> = (props) => {
  const user = useSelector(selectUser);
  const { id, date, requestNumber, title, statusText, statusColor } = props;
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
        history.push(`/replaceyears/application/${id}`);
      }}
    />
  );
};

export default ApplicationCard;
