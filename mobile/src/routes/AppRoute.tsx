import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { BottomNavigation } from 'react-native-paper';

import TopTabs from './TopTabs';
import UsuarioPage from '../pages/UsuarioPage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {Navigator, Screen} = createNativeStackNavigator();

const AppRoute = () => {

  const insets = useSafeAreaInsets();

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'transacoes',title: 'Campanhas', focusedIcon: 'cash-register', unfocusedIcon: 'cash-register' },
    { key: 'usuario', title: 'Usuário', focusedIcon: 'account-outline', unfocusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    transacoes: TopTabs,
    usuario: UsuarioPage,
  });

  return (
      <BottomNavigation 
          barStyle={{
            backgroundColor:'#ffffff', 
            marginBottom:insets.bottom , 
            height:40,
            justifyContent:'center', 
            alignItems:'center'
          }}
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          labeled={false}
      />
  );
}

export default AppRoute;