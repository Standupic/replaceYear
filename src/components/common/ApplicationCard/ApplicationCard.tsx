import React, { FC } from 'react';
import { Card } from 'juicyfront';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from 'juicyfront/types/projects.types';
import { useHistory } from 'react-router-dom';
import { selectUser } from '../../../selectors/userSelector';
import { IApplicationMapped } from '../../../store/applicationsSlice';
import getApplication from '../../../middlewares/getApplication';

const ApplicationCard: FC<IApplicationMapped> = (props) => {
  const user = useSelector(selectUser);
  const { id, date, requestNumber, title, statusText, statusColor } = props;
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
        dispatch(getApplication(id));
        history.push('/replaceyears/viewApplication');
      }}
    />
  );
};

export default ApplicationCard;
