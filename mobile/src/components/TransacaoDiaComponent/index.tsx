import React, { useState } from "react";
import { Alert, Image, View } from "react-native";

import { styles } from "./styles";
import { Transacao, TransacaoDia } from "../../@types/transacao";
import { Text, TouchableRipple } from "react-native-paper";
import { deleteTransacao } from "../../services/api";
import AttTransacao from "../AttTransacao";
import { TipoTransacao } from "../../@types/enums";
import { formatarData, formatarSaldoView } from "../../utils/formatador";

interface props {
  transacaoDia: TransacaoDia;
  alteracao: () => void
}
const TransacaoDiaComponent = ({ transacaoDia,alteracao }: props) => {

  const [visibleAtt, setVisibleAtt] = useState(false);
  const [transacaoState, setTransacaoState] = useState<Transacao>();


  const showModalAtt = () => setVisibleAtt(!visibleAtt);

  const handleDelete = (id:number) => {
    deleteTransacao(id).catch(response => console.log(response))
  }

  const handleAlterar = (transacaoAtt: Transacao) => {
    setTransacaoState(transacaoAtt);
    showModalAtt();
  }

  const alert = (id:number) =>
  Alert.alert('Transação', 'Deletar transação?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => {handleDelete(id); alteracao()}},
  ]);

  return (
    <View style={styles.caixaRelatorio}>
      <Text style={[styles.data, styles.texto]}>{formatarData(transacaoDia.data)}</Text>
      {transacaoDia.transacao.map((transacao) => (
        <TouchableRipple
        key={transacao.id}
        onPress={() => {handleAlterar(transacao)}}
        onLongPress={() => {alert(transacao.id!)}}
        rippleColor="rgba(0, 0, 0, .32)"
        style={[
          styles.caixaTransacao,
          {
            backgroundColor:
              transacao.tipo == "ENTRADA" ? "#dbffef" : "#FEFE",
          },
        ]}
        >
          <View
          >
            <Text variant="bodyLarge" style={styles.texto}>
              {`Horário: ${transacao.data.split("T")[1].substring(0, 8)}`}{" "}
            </Text>
            <Text variant="bodyLarge">{`Descrição: ${transacao.descricao}`}</Text>
            <View style={styles.viewTipo}>
              <Text
                style={
                  transacao.tipo == "ENTRADA"
                    ? styles.textoRelGreen
                    : styles.textoRelRed
                }
                variant="titleMedium"
              >{`Valor: ${formatarSaldoView(transacao.valor)}`}</Text>
              <Text
                style={
                  transacao.tipo == "ENTRADA"
                    ? styles.textoRelGreen
                    : styles.textoRelRed
                }
                variant="titleMedium"
              >
                {transacao.tipo}
              </Text>
            </View>
          </View>
        </TouchableRipple>
      ))}
      <AttTransacao
          alteracao={() => {alteracao()}}
          visible={visibleAtt}
          titulo={'Alterar Transação de '+(transacaoState?.tipo==TipoTransacao.ENTRADA? 'Entrada':'Saída')}
          transacao={transacaoState}
        onClose={() => showModalAtt()}
      />
    </View>
  );
};

export default TransacaoDiaComponent;
