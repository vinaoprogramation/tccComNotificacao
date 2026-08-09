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
  flatListImpressoes:{
    flex: 1
  },
  item:{
    backgroundColor: '#ffffff',
    width: width*0.8,
    
    marginVertical: 10,
    alignSelf: 'center',
    borderRadius: 15,
    elevation: 5
  },
  imagemImpressao:{
    width: '100%',
    height: 300,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  conteudo:{
    padding: 10,
    fontSize: 18
  },
  nome:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  detalhes:{
    padding: 5,
    gap: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
    
  },
  material:{
    borderRadius: 100,
    borderWidth: 1,
    width: 40,
    textAlign: 'center'
  },
  cor_filamento:{
    borderRadius: 100,
    borderWidth: 1,
    width: 120,
    textAlign: 'center'
  },
  gramas:{
    borderRadius: 100,
    borderWidth: 1,
    width: 50,
    textAlign: 'center'
  },
  status:{
    borderRadius: 100,
    borderWidth: 1,
    width: 70,
    textAlign: 'center'
  },
  categoria:{
    borderRadius: 100,
    borderWidth: 1,
    width: 60,
    textAlign: 'center'
  },
  botaoEncomenda:{
    backgroundColor: '#5f0068',
    color: '#ffffff',
    textAlign: 'center',
    width: '70%',
    borderRadius: 15,
    paddingVertical: 10,
    verticalAlign: 'middle',
    alignSelf: 'center',
    marginBottom: 10
  },
  textoEncomenda:{
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600'
  }
  

})

export default styles;