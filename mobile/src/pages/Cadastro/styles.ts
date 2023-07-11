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
    paddingTop:10,
    paddingBottom:40,
  },
  tinyLogo: {
    alignSelf:'center',
    width: 60,
    height: 60,
  },
  paragraph: {
    marginVertical: 16,
  },
  texto1: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: 'center',
  },
  button: {
    alignSelf:'center',
    marginTop: 60,
    width:150,
    marginBottom:20,
  },
});
