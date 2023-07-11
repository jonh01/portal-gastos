import React, { useEffect, useState } from 'react';
import { Alert, Image, View } from 'react-native';

import { styles } from './styles';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { TipoTransacao } from '../../@types/enums';
import { AlterTransacao, createTransacao } from '../../services/api';
import { Transacao } from '../../@types/transacao';
import { MaskedTextInput } from 'react-native-mask-text';
import { formatarSaldoNumber } from '../../utils/formatador';

interface props {
  visible: boolean;
  titulo:string
  transacao?: Transacao,
  onClose: () => void;
  alteracao: () => void;
}


const AttTransacao = ({visible,titulo, transacao, onClose, alteracao}: props) => {

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  useEffect(()=> {
    setDescricao(transacao?.descricao!);
  }, [visible])

  const handleAdd = () => {
    if(descricao == '' || valor == '')
      alertDefault('Campos Vazios', 'Preencha todos os campos!')
    else if (isNaN(formatarSaldoNumber(valor))) {
      alertDefault('Erro de tipo', 'Utilize ponto ao invés de virgula');
      setDescricao("");
      setValor("");
    }
     else{
       AlterTransacao({
        id:transacao?.id!,
        descricao: descricao!= transacao?.descricao?descricao: null,
        valor: formatarSaldoNumber(valor)!= transacao?.valor? formatarSaldoNumber(valor): null
      }).catch(response => console.log('error',response))
     }
  }

  const alertDefault = (titulo: string, mensagem: string) =>
  Alert.alert(titulo, mensagem, [
    {
      text: "Fechar",
      onPress: () => console.log("Alerta fechado"),
      style: "cancel",
    },
  ]);
  
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={[styles.container, {backgroundColor: transacao?.tipo==TipoTransacao.ENTRADA? '#dbffef': '#FEFE'}]}
    >
        <Text variant='titleLarge'
          style={{fontWeight:'900',paddingBottom:20}}
        >{titulo}</Text>

        <TextInput
          mode='outlined'
          label="Descrição"
          placeholder="Descrição"
          multiline
          value={descricao}
          onChangeText={text => setDescricao(text)}
          contentStyle={styles.textinput}
        />
                <TextInput
          mode="outlined"
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
              value={transacao? (
                transacao.valor.toString().includes('.')?
                ((transacao.valor.toFixed(2)).toString().replace(/\./g, "")) :
                transacao.valor.toString()+'00'
                ):''}
              onChangeText={(value) => {
                setValor(value);
              }}
            />
          )}
          contentStyle={styles.textinput}
        />

        <Button
          mode="elevated"
          style={styles.button}
          onPress={() => {
            handleAdd();
            onClose();
            alteracao();
          }}
        >
          Alterar
        </Button>
      </Modal>
    </Portal>
  );
  };
  
  export default AttTransacao;