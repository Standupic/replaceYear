import React from 'react';
import { Employee } from 'juicyfront';
import InlineCluster from '../../styledComponents/InlineCluster';
import { KEY_JUSTIFYING, KEY_SPACING } from '../../styledComponents/constants';
import { Card, Box, Stack } from '../../styledComponents';

const User = () => {
  return (
    <Employee
      user={{
        department: 'The Betrayer',
        departmentId: '11',
        departmentsPath: [
          {
            id: 'o1',
            name: 'Name 1',
            unitType: 'Unit type 1',
            unitTypeDesc: 'Unit description 1',
          },
        ],
        firstName: 'Illidan',
        fullName: 'Illidan Stormrage',
        id: '#000001',
        lastName: 'Stormrage',
        middleName: '',
        photo: '',
        position: 'Engineer',
        positionId: 'FE 1',
      }}
    />
    // <Card>
    //   <InlineCluster gutter={KEY_SPACING.lg} align={KEY_JUSTIFYING.center}>
    //     <Box>img</Box>
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
