import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";

import { styles } from "./styles";
import { useAppDispatch, useAppSelector } from "../../@types/reduxHooks";
import { fetchInfo } from "../../redux/TransacaoSlice";
import CarregamentoIni from "../../components/CarregamentoIni";
import { useIsFocused } from "@react-navigation/native";
import { TouchableRipple } from "react-native-paper";
import { fetchUsuario } from "../../redux/AuthSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Informacoes = () => {

  const usu = useAppSelector(state => state.auth.usuario);
  const saldo = useAppSelector(state => state.transacao.saldo);
  const entrada = useAppSelector(state => state.transacao.entrada);
  const saida = useAppSelector(state => state.transacao.saida);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInfo(usu?.id? usu?.id!:0));
    dispatch(fetchUsuario(usu?.email? usu.email:''));
  }, [])

  return (
    <TouchableRipple 
    onPress={() => {dispatch(fetchInfo(usu?.id? usu?.id!:0));}}
    style={styles.container}>
      <View>
        <View style={styles.header}>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/porco.png")}
          />
        </View>

        <View style={styles.caixaSaldo}>
          <Text style={styles.texto1}>Saldo da conta</Text>
          <Text style={styles.texto2}>{`R$ ${saldo.toFixed(2)}`}</Text>
          
        </View>

        <View style={styles.caixaRelatorio}>
          <Text style={styles.texto1}>Visão geral do mês</Text>
          <View style={styles.relatorioItens}>
            <View>
              <Text style={styles.textoRel}>Receitas</Text>
              <Text style={styles.textoRel}>Despesas</Text>
            </View>
            <View>
              <Text style={styles.textoRelGreen}>{`R$ ${entrada}`}</Text>
              <Text style={styles.textoRelRed}>{`R$ ${saida}`}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.textAtt }>Pressione para atualizar...</Text>
      </View>
    </TouchableRipple>
  );
};

export default Informacoes;
