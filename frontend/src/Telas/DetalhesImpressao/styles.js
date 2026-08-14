import { StyleSheet, Dimensions } from "react-native";

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  titulo:{
    fontSize: 20,
    marginTop: 100,
    marginLeft: 30
  },
  fundo:{
    backgroundColor: '#ffffff',
    flex: 1
  },
  item:{
    elevation: 5
  },
  imagemImpressao: {
      width: "90%",
      height: 350,

      alignSelf: 'center',
      elevation: 5
  },
  cabecalhoImpressao:{
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: -10,
    zIndex: 1,
    elevation: 5,
    width: "90%",
    alignSelf: 'center',
    flexDirection: 'row'
  },
  fotoPerfil:{
    borderRadius: 100,
    width: 50,
    height: 50,
    margin: 10,
    elevation: 10,
  },
  textosCabecalho:{
    flexDirection: 'row'
  },
  textoCabecalho:{
    fontSize: 14,
    verticalAlign: 'middle',
    textShadowColor: '#0000000c',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 2
  },
  negrito:{
    fontWeight: 'bold'
  },
  detalhes:{
    flexWrap: 'wrap',
    width: '90%',
    alignSelf: 'center',
    
  },
  tituloPrincipais:{
    fontSize: 20,
    marginRight: 10
  },
  textoOutro:{
    borderWidth: 0.7,
    borderRadius: 20,
    padding: 5,
    verticalAlign: 'middle',
    flexWrap: 'wrap'
  },
  textosPrincipais:{
    fontSize: 16,
    textShadowColor: '#0000000c',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 2
  },
  principais:{
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    elevation: 5,
    width: '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 20
  },
  adicionais:{
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 30,
    marginTop: -10,
    boxSizing: 'border-box',
    elevation: 5,
    backgroundColor: '#ffffff',
    zIndex: -1,
    width: '80%',
    alignSelf: 'center'
    
  },
  tituloAdicionais:{
    fontSize: 18,
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 20
  },
  textosAdicionais:{
    marginLeft: 5,
    fontSize: 16,
    marginVertical: 10
  },
  containerEncomendas:{
    marginBottom: 100,
    
  },
  encomendas:{
    width: width,
    backgroundColor: '#ffffff' ,
    
    elevation: 5,
    paddingVertical: 20
  },
  tituloEncomendas:{
    textAlign: 'center',
    fontSize: 18
  },
  entradaEncomendas:{
    padding: 20
  },
  textosChamada:{
    padding: 10,
    gap: 8
  },
  chamada:{
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  input:{
    backgroundColor: '#ffffffbd',
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10
  },
  botaoEncomendar:{
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#ffffff',
    paddingVertical: 20
  },

  textoEncomendar:{
    textAlign: 'center'
  },
  tituloInputs:{
    fontSize: 20
  },
  input:{
    fontSize: 16,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 5
  },
  containerInputs:{
    flexDirection: 'row',
    gap: 10
  },
  containerValores:{
    padding: 20,
    gap: 10
  },
  valor:{
    backgroundColor: '#ffffff',
    borderRadius: 5,
    elevation: 5,
    padding:10
  }
});

export default styles