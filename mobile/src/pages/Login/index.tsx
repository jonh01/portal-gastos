import React, { useState } from "react";
import {
  Image,
  View,
  ScrollView,
} from "react-native";

import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { loginUsu } from "../../services/api";
import { useAppDispatch } from "../../@types/reduxHooks";
import { signIn } from "../../redux/AuthSlice";
import { Usuario } from "../../@types/usuario";

const Login = () => {

  const [usuEmail, SetUsuEmail] = useState("");
  const [usuSenha, SetUsuSenha] = useState("");

  const [snakBar, setSnakBar] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const navigation = useNavigation()
  const dispatch = useAppDispatch();

  const onToggleSnackBar = () => setSnakBar(!snakBar);
  const onDismissSnackBar = () => setSnakBar(false);

  const handleLogin = () => {

    loginUsu({email: usuEmail, senha:usuSenha}).then(response => {
      const usu:Usuario = response.data as Usuario;
      console.log(response.data);
      dispatch(signIn({ usuario: usu }));
    }).catch(response => {
      console.log(response)
      setMensagem('Login ou senha inválido!');
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
            Login
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

        <View style={styles.paragraph}>
          <Text style={styles.texto1} variant="labelLarge">
            Senha
          </Text>
          <TextInput
            outlineStyle={{borderColor:'#FFFFFF'}}
            mode="outlined"
            placeholder="Insira sua Senha"
            secureTextEntry
            onChangeText={SetUsuSenha}
            value={usuSenha}
          />
          <Button
            mode="text"
            rippleColor={'#38B6FF'}
            onPress={() => navigation.navigate("senha")}
          >
              <Text> Esqueceu a senha </Text>
          </Button>
        </View>

        <Button
          style={styles.button}
          buttonColor={'#FFFFFF'}
          mode="contained"
          onPress={handleLogin}
          textColor="#000000"
          >
          Entrar
        </Button>
        <Button 
        mode="text"
        rippleColor={'#38B6FF'}
        onPress={() => navigation.navigate("cadastro")}>
            <Text>Registre-se</Text>
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

export default Login;

