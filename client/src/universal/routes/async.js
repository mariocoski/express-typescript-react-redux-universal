import React from 'react';
import Loadable from 'react-loadable';

export const Home = Loadable({
  loader: () => import('../containers/HomeContainer.jsx'),
  loading: ()=>(<div>Loading...</div>)
});
export const Counter = Loadable({
  loader: () => import('../containers/CounterContainer.jsx'),
  loading: ()=>(<div>Loading...</div>)
});