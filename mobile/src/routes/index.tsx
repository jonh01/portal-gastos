import React from 'react';
import { useAppSelector } from '../@types/reduxHooks';
import AppRoute from './AppRoute';
import AuthRoute from './AuthRoute';

const Routes = () => {

  const signed = useAppSelector((state) => state.auth.signed);

  return signed ? <AppRoute /> : <AuthRoute />;

};

export default Routes;