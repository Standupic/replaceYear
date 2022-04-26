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
          if (location.pathname !== '/') {
            history.push('/');
          }
        },
        active: location.pathname === '/' && true,
      },
      {
        label: 'Мои заявки',
        handler: () => {
          if (location.pathname !== '/applications') {
            history.push('/applications');
          }
        },
        active: location.pathname === '/applications' && true,
      },
    ];
  },[location.pathname]);
  return <Tabs showMenu={false} list={data} />;
};

export default NavigationTabs;
