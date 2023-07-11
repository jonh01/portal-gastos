import React from 'react';
import { ActivityIndicator, Portal, useTheme } from 'react-native-paper';
import { styles } from './styles';

const Loading = () => {
  return (
    <Portal>
    <ActivityIndicator style={styles.container} animating={true} size={'large'} />
  </Portal>
  );
};

export default Loading;
