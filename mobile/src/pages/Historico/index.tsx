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
import AttTransacao from "../../components/AttTransacao";
import { fetchUsuario } from "../../redux/AuthSlice";

const Historico = () => {
  const usu = useAppSelector((state) => state.auth.usuario);
  const tr = useAppSelector((state) => state.transacao.transacoes);
  const dispatch = useAppDispatch();

  const [tipo, setTipo] = useState(TipoTransacao.ENTRADA);
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }:any) => setState({ open });
  const [alteracao, setAlteracao] = useState(true);

  const [visibleAdd, setVisibleAdd] = useState(false);

  const showModalAdd = () => setVisibleAdd(!visibleAdd);

  const alterou = () => {
    setAlteracao(true);
  };

  const { open } = state;

  useEffect(() => {
    findAll(usu?.id? usu?.id!:0)
      .then((response) => {
        const lista: TransacaoDia[] = Object.entries(response.data).map(([data, transacoes]) => ({
          data,
          transacao: transacoes as Transacao[]
        }));
        dispatch(setTransacao(lista));
        dispatch(fetchInfo(usu?.id? usu?.id!:0));
        dispatch(fetchUsuario(usu?.email? usu.email:''));
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
              onPress: () => {setTipo(TipoTransacao.ENTRADA); showModalAdd()},
            },
            {
              icon: 'cash-minus',
              label: 'Saída',
              color: '#FF3131',
              onPress: () => {setTipo(TipoTransacao.SAIDA); showModalAdd()},
            },
          ]}
          onStateChange={onStateChange}
        />
        <AddTransacao
          alteracao={() => {alterou()}}
          visible={visibleAdd}
          titulo={tipo == TipoTransacao.ENTRADA? 'Transação de Entrada': 'Transação de Saída'}
          tipo={tipo}
        onClose={() => showModalAdd()}
      />
    </View>
  );
};

export default Historico;
