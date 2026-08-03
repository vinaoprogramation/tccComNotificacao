import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
  fundo: {
    backgroundColor: "#7e6fff",
    flex: 1
  },
  imagem:{
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: 100,
    position: 'absolute',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
    zIndex: 1
  },
  imagemImpressao:{
    width: width * 0.8,
    height: width * 0.8
  },

})

export default styles;