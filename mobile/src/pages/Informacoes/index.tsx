import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";

import { styles } from "./styles";
import { FAB } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../@types/reduxHooks";
import { setEntrada, setSaida, setSaldo, setTransacoes } from "../../redux/TransacaoSlice";
import { findAll, somaSaldoMes } from "../../services/api";
import { TipoTransacao } from "../../@types/enums";
import { TransacaoDia } from "../../@types/transacao";

const Informacoes = () => {

  const usu = useAppSelector(state => state.auth.usuario);
  const saldo = useAppSelector(state => state.transacao.saldo);
  const entrada = useAppSelector(state => state.transacao.entrada);
  const saida = useAppSelector(state => state.transacao.saida);
  const transacoes = useAppSelector(state => state.transacao.transacoes);

  const dispatch = useAppDispatch();

  const [state, setState] = useState({ open: false });

  useEffect(() => {
      console.log(saldo)
      // somaSaldoMes(usu?.id!, TipoTransacao.SAIDA).then(response => {
      //   console.log(response.data)
      //   dispatch(setSaida({ saida: response.data }));
      // })
      // console.log(saldo, '',entrada, '',saida)
  }, []);

  const onStateChange = ({ open }:any) => setState({ open });

  const { open } = state;

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/porco.png")}
          />
        </View>

        <View style={styles.caixaSaldo}>
          <Text style={styles.texto1}>Saldo da conta</Text>
          <Text style={styles.texto2}>{`R$ ${saldo}`}</Text>
          
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
      </View>
        <FAB.Group
          open={open}
          visible
          fabStyle={styles.fab}
          icon={open ? 'plus' : 'cash-register'}
          actions={[
            {
              icon: 'cash-plus',
              label: 'Entrada',
              color: '#7ED957',
              onPress: () => console.log('Pressed star'),
            },
            {
              icon: 'cash-minus',
              label: 'Saída',
              color: '#FF3131',
              onPress: () => console.log('Pressed email'),
            },
          ]}
          onStateChange={onStateChange}
        />
    </View>
  );
};

export default Informacoes;
