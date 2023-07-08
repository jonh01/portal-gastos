import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import Usuario from '../pages/Usuario';

const {Navigator, Screen} = createNativeStackNavigator();

const AppRoute = () => {

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'transacoes',title: 'Campanhas', focusedIcon: 'cash-register', unfocusedIcon: 'cash-register' },
    { key: 'usuario', title: 'Usuário', focusedIcon: 'account-outline', unfocusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    transacoes: HistoricoCamp,
    usuario: Usuario,
  });

  return (
      <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          labeled={false}
      />
  );
}

export default AppRoute;