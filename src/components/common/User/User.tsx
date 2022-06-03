import React from 'react';
import { Employee } from 'juicyfront';
import { useSelector } from 'react-redux';
import { IUser } from 'juicyfront/types/projects.types';
import InlineCluster from '../../styledComponents/InlineCluster';
import { KEY_JUSTIFYING, KEY_SPACING } from '../../styledComponents/constants';
import { Card, Box, Stack } from '../../styledComponents';
import { selectUser, selectIsUserLoaded } from '../../../selectors/userSelector';

const User = () => {
  const user = useSelector(selectUser);
  const userLoaded = useSelector(selectIsUserLoaded);
  return (
    <>{userLoaded ? <Employee user={user ? user : ({} as IUser)} /> : null}</>
    // <Card>
    //   <InlineCluster gutter={KEY_SPACING.lg} align={KEY_JUSTIFYING.center}>
    //     <Box>
    //       <img src={user.photo} />
    //     </Box>
    //     <Stack>
    //       <Box>Кузнецова Злата Игоревна</Box>
    //       <InlineCluster gutter={KEY_SPACING.lg} align={KEY_JUSTIFYING.center}>
    //         <Box>1.1 категория</Box>
    //         <Box>Начальник управления, вице-президент</Box>
    //       </InlineCluster>
    //     </Stack>
    //   </InlineCluster>
    // </Card>
  );
};

export default User;
