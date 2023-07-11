import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#38B6FF',
  },
  scrollView: {
    marginHorizontal:0,
    paddingHorizontal:40,
  },
  nav: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  header: {
    paddingTop:30,
    paddingBottom:40,
  },
  tinyLogo: {
    alignSelf:'center',
    width: 240,
    height: 240,
  },
  paragraph: {
    marginVertical: 24,
  },
  texto1: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: 'center',
    marginBottom:20,
  },
  button: {
    alignSelf:'center',
    marginTop: 20,
    width:150,
    marginBottom:20,
  },
});
