import React from 'react';
import { util } from '@helpers/utils';
import { Router, browserHistory } from 'react-router';

import Main from '@components/Main';

export function getRoutes() {
  return {
    path: '/',
    component: Main,
    onEnter: handleRouteEnter,
    childRoutes: [
      {
        path: 'products',
        onEnter: handleRouteEnter,
        getComponent(location, cb) {
          cb(null, require('@pages/Products').default);
        }
      }
    ]
  };
}
function handleRouteEnter(nextState, replaceState) {
  let currentRoute = util.getCurrentActiveRoute(nextState.location.pathname);
  let isLoggedIn = util.isLoggedIn();
  if (!currentRoute) {
    if (isLoggedIn) {
      replaceState({
        pathname: '/products'
      });
    }
  } else {
    if (!isLoggedIn) {
      replaceState({
        pathname: '/'
      });
    }
  }
}
export function routes() {
  const routes = getRoutes();
  return <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)} />;
}
