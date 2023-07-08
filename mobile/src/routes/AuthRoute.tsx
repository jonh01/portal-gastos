import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Senha from '../pages/Senha';

const {Navigator, Screen} = createNativeStackNavigator();

const AuthRoute = () => {

  return (
    <Navigator
    screenOptions={{}}
    initialRouteName={'login'}
    >
      <Screen
        name="login"
        component={Login}
        options={{headerShown: false}}
      />
      <Screen
        name="cadastro"
        component={Cadastro}
      />
      <Screen
        name="senha"
        component={Senha}
      />
    </Navigator>
  );
};

export default AuthRoute;