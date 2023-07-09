import React, { useState } from 'react';
import { Alert, Image, View } from 'react-native';

import { styles } from './styles';
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import { TipoTransacao } from '../../@types/enums';
import { createTransacao } from '../../services/api';
import { useAppSelector } from '../../@types/reduxHooks';

interface props {
  visible: boolean;
  titulo:string
  tipo: TipoTransacao,
  onClose: () => void;
  alteracao: () => void;
}


const AddTransacao = ({visible,titulo, tipo, onClose, alteracao}: props) => {

  const usu = useAppSelector((state) => state.auth.usuario);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const handleAdd = () => {
    if(descricao == '' || valor == '')
      alertDefault('Campos Vazios', 'Preencha todos os campos!')
    else if (isNaN(parseFloat(valor))) {
      alertDefault('Erro de tipo', 'Utilize ponto ao invés de virgula')
    }
    else{
      createTransacao({data:(new Date()).toISOString(), descricao:descricao, tipo:tipo, valor:parseFloat(valor), usuarioId:usu!.id!}).then(()=> {
        setDescricao('');
        setValor('');
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
        contentContainerStyle={styles.container}
    >
        <Text variant='titleLarge'
          style={{color:tipo==TipoTransacao.ENTRADA? '#3bc500':'#FF3131', fontWeight:'900',paddingBottom:20}}
        >Adicionar Transação de {tipo==TipoTransacao.ENTRADA? 'Entrada': 'Saída'}</Text>

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
          value={valor.toString()}
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
          Adicionar
        </Button>
      </Modal>
    </Portal>
  );
  };
  
  export default AddTransacao;