import React, { useState } from "react";
import { Alert, Image, View } from "react-native";

import { styles } from "./styles";
import { Transacao, TransacaoDia } from "../../@types/transacao";
import { Text, TouchableRipple } from "react-native-paper";
import { deleteTransacao } from "../../services/api";

interface props {
  transacaoDia: TransacaoDia;
  alteracao: () => void
}
const TransacaoDiaComponent = ({ transacaoDia,alteracao }: props) => {

  const handleDelete = (id:number) => {
    deleteTransacao(id).catch(response => console.log(response))
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
      <Text style={[styles.data, styles.texto]}>{transacaoDia.data}</Text>
      {transacaoDia.transacao.map((transacao) => (
        <TouchableRipple
        key={transacao.id}
        onPress={() => console.log('press')}
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
              >{`Valor R$: ${transacao.valor}`}</Text>
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
    </View>
  );
};

export default TransacaoDiaComponent;
