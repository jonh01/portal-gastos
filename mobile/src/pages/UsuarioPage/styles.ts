import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  caixa: {
    marginTop:140,
    backgroundColor: "white",
    borderRadius: 15,
    width: 300,
    padding: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: 'center',
    alignItems:'center',
  },
  avatar: {
    alignSelf:'center',
    marginBottom:36,
  },
  button: {
    width:200,
    alignSelf:'center',
    marginTop:40,
  }
});