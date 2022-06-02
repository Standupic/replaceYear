import React from 'react';
import { Employee } from 'juicyfront';
import { useSelector } from 'react-redux';
import InlineCluster from '../../styledComponents/InlineCluster';
import { KEY_JUSTIFYING, KEY_SPACING } from '../../styledComponents/constants';
import { Card, Box, Stack } from '../../styledComponents';
import { selectUser, selectIsUserLoaded } from '../../../selectors/userSelector';
import { UserProfile } from './user-parts';

const User = () => {
  const user = useSelector(selectUser);
  const userLoaded = useSelector(selectIsUserLoaded);
  if (user && userLoaded) {
    return (
      <Card>
        <InlineCluster gutter={KEY_SPACING.lg} align={KEY_JUSTIFYING.center}>
          <UserProfile src={user.photo} />
          <Stack>
            <Box>{user.fullName}</Box>
            <InlineCluster gutter={KEY_SPACING.lg} align={KEY_JUSTIFYING.center}>
              <Box>TH:#{user.id}</Box>
              <Box>{user.position}</Box>
            </InlineCluster>
          </Stack>
        </InlineCluster>
      </Card>
    );
  }
  return null;
};

export default User;
