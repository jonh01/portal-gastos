import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";

import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Snackbar, TextInput, Text } from "react-native-paper";
import { useAppDispatch } from "../../@types/reduxHooks";
import { createUsu } from "../../services/api";
import { Usuario } from "../../@types/usuario";
import { signIn } from "../../redux/AuthSlice";
import { MaskedTextInput } from "react-native-mask-text";
import { formatarSaldoNumber } from "../../utils/formatador";

const Cadastro = () => {
  const [usuEmail, SetUsuEmail] = useState("");
  const [usuSenha, SetUsuSenha] = useState("");
  const [usuNome, setUsuNome] = useState("");
  const [usuSalo, setUsuSaldo] = useState("");

  const [snakBar, setSnakBar] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const dispatch = useAppDispatch();

  const onToggleSnackBar = () => setSnakBar(!snakBar);
  const onDismissSnackBar = () => setSnakBar(false);

  const handleLogin = () => {
    if (usuEmail == "" || usuSenha == "" || usuNome == "" || usuSalo == "") {
      setMensagem("Preencha todos os campos!");
      onToggleSnackBar();
    } else if (isNaN(formatarSaldoNumber(usuSalo))) {
      setMensagem("Saldo em formato incorreto!");
      onToggleSnackBar();
    } else {
      createUsu({
        nome: usuNome,
        email: usuEmail,
        senha: usuSenha,
        saldo: formatarSaldoNumber(usuSalo),
      })
        .then((response) => {
          const usu: Usuario = response.data as Usuario;
          console.log(response.data);
          dispatch(signIn({ usuario: usu }));
        })
        .catch((response) => {
          console.log(response);
          const message: string = response.message;
          if (message.includes("400")) {
            setMensagem("Email já cadastrado!");
            onToggleSnackBar();
          } else {
            setMensagem("Erro ao criar usuário");
            onToggleSnackBar();
          }
        });
    }
  };

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
            Nome
          </Text>
          <TextInput
            outlineStyle={{ borderColor: "#FFFFFF" }}
            mode="outlined"
            placeholder="Insira seu nome"
            onChangeText={setUsuNome}
            value={usuNome}
          />
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.texto1} variant="labelLarge">
            Login
          </Text>
          <TextInput
            outlineStyle={{ borderColor: "#FFFFFF" }}
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
            outlineStyle={{ borderColor: "#FFFFFF" }}
            mode="outlined"
            placeholder="Insira sua Senha"
            secureTextEntry
            onChangeText={SetUsuSenha}
            value={usuSenha}
          />
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.texto1} variant="labelLarge">
            Saldo Inicial
          </Text>
          <TextInput
            outlineStyle={{ borderColor: "#FFFFFF" }}
            mode="outlined"
            placeholder="Insira seu saldo inicial"
            keyboardType="numeric"
            render={(props) => (
              <MaskedTextInput
                {...props}
                type="currency"
                options={{
                  prefix: "R$",
                  decimalSeparator: ",",
                  groupSeparator: ".",
                  precision: 2,
                }}
                onChangeText={(value) => {
                  setUsuSaldo(value);
                }}
              />
            )}
          />
        </View>

        <Button
          style={styles.button}
          buttonColor={"#FFFFFF"}
          mode="contained"
          onPress={handleLogin}
          textColor="#000000"
        >
          Cadastrar
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

export default Cadastro;
