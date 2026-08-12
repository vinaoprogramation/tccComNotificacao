import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  fundo: {
    backgroundColor: "#000000"
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
  botao: {
    backgroundColor: "#4900be",
    width: width * 0.9,
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 5
  },
  textoBotao: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'regular',
    color: "#ffffff"
  },
  registro: {
    flexDirection: 'row',
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 5,
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoChamada: {
    color: "#ffffff",
    fontSize: 15,
    verticalAlign: 'middle',
    alignSelf: 'center',
    textShadowColor: "#0000004d",
    textShadowRadius: 5,
    textShadowOffset: { width: 0.1, height: 0.1 }
  },
  textoClicavel: {
    color: "#4900be",
    fontSize: 18,
    verticalAlign: 'middle',
    fontWeight: 'bold',
    marginLeft: 5
  }

})

export default styles;