import { Tabs } from 'juicyfront';
import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Box } from '../../styledComponents';

const NavigationTabs = () => {
  const history = useHistory();
  const location = useLocation();
  const data = useMemo(() => {
    return [
      {
        label: 'Создание заявки',
        handler: () => {
          if (location.pathname !== '/replaceyears') {
            history.push('/replaceyears');
          }
        },
        active: location.pathname === '/replaceyears' && true,
      },
      {
        label: 'Мои заявки',
        handler: () => {
          if (location.pathname !== '/replaceyears/applications') {
            history.push('/replaceyears/applications');
          }
        },
        active: location.pathname === '/replaceyears/applications' && true,
      },
    ];
  }, [location.pathname]);
  return (
    <Box>
      <Tabs showMenu={false} list={data} />
    </Box>
  );
};

export default NavigationTabs;
