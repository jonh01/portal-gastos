import React, { useEffect, useState } from "react";
import { View, Image, FlatList, Alert } from "react-native";

import { styles } from "./styles";
import TransacaoDiaComponent from "../../components/TransacaoDiaComponent";
import { useAppDispatch, useAppSelector } from "../../@types/reduxHooks";
import { findAll } from "../../services/api";
import { fetchInfo, setTransacao } from "../../redux/TransacaoSlice";
import { Transacao, TransacaoDia } from "../../@types/transacao";
import { FAB, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ListEmpty from "../../components/ListEmpty";
import AddTransacao from "../../components/AddTransacao";
import { TipoTransacao } from "../../@types/enums";

const Historico = () => {
  const usu = useAppSelector((state) => state.auth.usuario);
  const tr = useAppSelector((state) => state.transacao.transacoes);
  const dispatch = useAppDispatch();

  const [tipo, setTipo] = useState(TipoTransacao.ENTRADA);
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }:any) => setState({ open });
  const [alteracao, setAlteracao] = useState(true);

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(!visible);

  const alterou = () => {
    setAlteracao(true);
    dispatch(fetchInfo(usu?.id? usu?.id!:0));
  };

  const { open } = state;

  useEffect(() => {
    findAll(usu?.id? usu?.id!:0)
      .then((response) => {
        console.log("response", response.data);
        const lista: TransacaoDia[] = Object.entries(response.data).map(([data, transacoes]) => ({
          data,
          transacao: transacoes as Transacao[]
        }));
        dispatch(setTransacao(lista));
        setAlteracao(false);
      })
      .catch((response) => {
        console.log("response error", response);
      });
  }, [alteracao]);

  return (
    <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require("../../assets/porco.png")}
        />
        <FlatList
        showsVerticalScrollIndicator={false}
        data={tr}
        keyExtractor={(list) => list.data}
        ListEmptyComponent={
          (<ListEmpty
            title="Sem transações!"
            subTitle="Clique no botão e adicione uma!"
          />)
        }
        renderItem={({ item }) => (
          <TransacaoDiaComponent transacaoDia={item}  alteracao={() => {alterou()}}/>
        )}
      />
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
              onPress: () => {setTipo(TipoTransacao.ENTRADA); showModal()},
            },
            {
              icon: 'cash-minus',
              label: 'Saída',
              color: '#FF3131',
              onPress: () => {setTipo(TipoTransacao.SAIDA); showModal()},
            },
          ]}
          onStateChange={onStateChange}
        />
        <AddTransacao
          alteracao={() => {alterou()}}
          visible={visible}
          titulo={tipo == TipoTransacao.ENTRADA? 'Transação de Entrada': 'Transação de Saída'}
          tipo={tipo}
        onClose={() => showModal()}
      />
    </View>
  );
};

export default Historico;
