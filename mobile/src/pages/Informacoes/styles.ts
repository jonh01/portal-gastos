import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    backgroundColor: '#38B6FF',
  },

  header: {
    marginTop: 40,
    marginBottom: 20,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  tinyLogo: {
    width: 160,
    height: 160,
  },
  
  caixaSaldo: {
    backgroundColor: "white",
    borderRadius: 5,
    width: 360,
    height: 150,
    paddingVertical: 10,
    fontWeight: "bold",
    color: "white",
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
  texto1: {
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: 'center',
  },
  texto2: {
    fontWeight: "bold",
    fontSize: 40,
    alignSelf: 'center',
    marginTop: 20,
  },

  caixaRelatorio: {
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 5,
    width: 300,
    height: 150,
    padding: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
  relatorioItens: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },    
  textoRel: {
    marginTop:10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  textoRelGreen: {
    marginTop:10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#7ED957'
  },

  textoRelRed: {
    marginTop:10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF3131'
  },
  textAtt: {
    alignSelf:'center',
    color: 'rgba(255,255,255,.6)',
    fontSize: 16,
    marginTop:140,
  },
});