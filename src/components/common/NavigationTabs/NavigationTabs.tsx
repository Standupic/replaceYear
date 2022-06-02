import { Tabs } from 'juicyfront';
import React, { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const NavigationTabs = () => {
  const history = useHistory();
  const location = useLocation();
  const data = useMemo(() => {
    return [
      {
        label: 'Создание заявки',
        handler: () => {
          if (location.pathname !== '/service/replaceyears') {
            history.push('/service/replaceyears');
          }
        },
        active: location.pathname === '/service/replaceyears' && true,
      },
      {
        label: 'Мои заявки',
        handler: () => {
          if (location.pathname !== '/service/applications') {
            history.push('/service/applications');
          }
        },
        active: location.pathname === '/service/applications' && true,
      },
    ];
  }, [location.pathname]);
  return <Tabs showMenu={false} list={data} />;
};

export default NavigationTabs;
