import React from 'react';
import { Image, View } from 'react-native';

import { styles } from './styles';

const CarregamentoIni = () => {
    return (
      <View style={styles.container}>
        <Image
        style={styles.tinyLogo}
        source={require('../../assets/porco.png')}
        />
      </View>
    );
  };
  
  export default CarregamentoIni;