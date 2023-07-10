import React from 'react';
import { View, Image } from 'react-native';

import { styles } from './styles';
import { Avatar, Button, Text } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../@types/reduxHooks';
import { signOut } from '../../redux/AuthSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const UsuarioPage = () => {

  const dispatch = useAppDispatch();

  const usu = useAppSelector(state => state.auth.usuario);
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.caixa}>
          <Avatar.Text size={106} label={usu!.nome.charAt(0)} style={styles.avatar} />
          <Text variant='titleLarge' >{`Nome: ${usu!.nome}`}</Text>
          <Text variant='titleMedium'>{`Email: ${usu!.email}`}</Text>
        </View>

        <Button
          style={styles.button}
          buttonColor={'#FFFFFF'}
          mode="contained"
          onPress={() => dispatch(signOut())}
          textColor="#000000"
          >
          sair
        </Button>
      </SafeAreaView>
    );
  };
  
  export default UsuarioPage;