import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  fundo: {
    backgroundColor: "#7e6fff"
  },
  titulo: {
    fontSize: 35,
    textAlign: 'left',
    position: 'relative',
    marginTop: 300,
    marginLeft: 20,
    color: '#ffffff',
    textShadowColor: "#0000004d",
    textShadowRadius: 5,
    textShadowOffset: { width: 0.1, height: 0.1 }
  },
  grupoEntrada:{
    marginTop: 10,
    gap: 10,
  },
  entrada:{
    backgroundColor: "#ffffff",
    width: width * 0.9,
    alignSelf: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
    fontSize: 16,
    textAlign: 'left',
  },
  botao: {
    backgroundColor: "#4900be",
    width: width * 0.9,
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
    marginTop: 20
  },
  textoBotao: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'regular',
    color: "#ffffff"
  },

})

export default styles;