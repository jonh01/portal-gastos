import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  caixaRelatorio: {
    marginVertical: 10,
    backgroundColor: "white",
    elevation:5,
    fontWeight: "bold",
    color: "white",
  }, 
  caixaTransacao: {
    marginVertical:10,
    padding:10,
  },
  viewTipo : {
    flexDirection:'row',
    justifyContent:'space-between',
  },
  data: {
    alignSelf:'flex-end',
    paddingTop:5,
    paddingRight:10,
  },
  textoRelGreen: {
    fontWeight:'900',
    color: '#7ED957'
  },

  textoRelRed: {
    fontWeight:'900',
    color: '#FF3131'
  },
  texto: {
    fontWeight:'900',
  },
});