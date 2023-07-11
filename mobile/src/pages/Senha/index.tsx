import React, { useState } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { AlterSenhaUsu } from '../../services/api';

const Senha = () => {
    
  const [usuEmail, SetUsuEmail] = useState("");

  const [snakBar, setSnakBar] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const onToggleSnackBar = () => setSnakBar(!snakBar);
  const onDismissSnackBar = () => setSnakBar(false);

  const handleSenha = () => {

    AlterSenhaUsu({email:usuEmail, senha:''}).then(() => {
      setMensagem('Senha alterada! Nova senha: 123');
      onToggleSnackBar();

    }).catch(response => {
      console.log(response)
      setMensagem('Email não cadastrado!');
      onToggleSnackBar();
    })
  }
    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.header}>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/porco.png")}
          />
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.texto1} variant="labelLarge">
            Email
          </Text>
          <TextInput
            outlineStyle={{borderColor:'#FFFFFF'}}
            mode="outlined"
            placeholder="example@email.com"
            keyboardType="email-address"
            onChangeText={SetUsuEmail}
            value={usuEmail}
          />
        </View>

        <Button
          style={styles.button}
          buttonColor={'#FFFFFF'}
          mode="contained"
          onPress={handleSenha}
          textColor="#000000"
          >
          Enviar
        </Button>
      </ScrollView>
      <Snackbar
          visible={snakBar}
          onDismiss={onDismissSnackBar}
          duration={2000}
          action={{
            label: "Fechar",
            onPress: () => {
              // Do something
            },
          }}
        >
          {mensagem}
        </Snackbar>
    </SafeAreaView>
  );
  };
  
  export default Senha;