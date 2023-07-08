import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { Button } from 'react-native-paper';
import { useAppDispatch } from '../../@types/reduxHooks';
import { signOut } from '../../redux/AuthSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const UsuarioPage = () => {

  const dispatch = useAppDispatch();
    return (
      <SafeAreaView style={styles.container}>
               <Button
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