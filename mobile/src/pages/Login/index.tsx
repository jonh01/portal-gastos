import React, { useState } from "react";
import {
  Image,
  View,
  ScrollView,
} from "react-native";

import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { findSaldoByUsuId, loginUsu, somaSaldoMes } from "../../services/api";
import { useAppDispatch } from "../../@types/reduxHooks";
import { signIn } from "../../redux/AuthSlice";
import { Usuario } from "../../@types/usuario";
import { TipoTransacao } from "../../@types/enums";

const Login = () => {

  const [usuEmail, SetUsuEmail] = useState("");
  const [usuSenha, SetUsuSenha] = useState("");

  const navigation = useNavigation()
  const dispatch = useAppDispatch();

  const handleLogin = () => {

    loginUsu({email: usuEmail, senha:usuSenha}).then(response => {
      const usu:Usuario = response.data as Usuario;
      console.log(response);
      dispatch(signIn({ usuario: usu }));
    }).catch(response => {
      console.log(response)
    })
  }
    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="none"
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
    </SafeAreaView>
  );
};

export default Login;

