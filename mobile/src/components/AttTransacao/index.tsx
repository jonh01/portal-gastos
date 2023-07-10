import React, { useEffect, useState } from 'react';
import { Alert, Image, View } from 'react-native';

import { styles } from './styles';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { TipoTransacao } from '../../@types/enums';
import { AlterTransacao, createTransacao } from '../../services/api';
import { Transacao } from '../../@types/transacao';

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
    setValor(transacao?.valor.toString()!)
  }, [visible])

  const handleAdd = () => {
    if(descricao == '' || valor == '')
      alertDefault('Campos Vazios', 'Preencha todos os campos!')
    else if (isNaN(parseFloat(valor))) {
      alertDefault('Erro de tipo', 'Utilize ponto ao invés de virgula')
    }
     else{
       AlterTransacao({
        id:transacao?.id!,
        descricao: descricao!= transacao?.descricao?descricao: null,
        valor: parseFloat(valor)!= transacao?.valor? parseFloat(valor): null
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
          mode='outlined'
          label="Valor"
          placeholder="Valor"
          keyboardType='number-pad'
          value={valor}
          onChangeText={text => setValor(text)}
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