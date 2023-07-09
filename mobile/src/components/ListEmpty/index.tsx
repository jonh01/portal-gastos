import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {styles} from './styles';

interface props {
  title: string;
  subTitle?: string;
}

const ListEmpty = ({title, subTitle}: props) => {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium">{title}</Text>
      {subTitle ? <Text variant="bodyLarge">{subTitle}</Text> : null}
    </View>
  );
};

export default ListEmpty;
