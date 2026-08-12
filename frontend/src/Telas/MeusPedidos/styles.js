import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({

  conteudo:{
        
    },
    titulo:{
        fontSize: 22
    },
    mensagem:{
        fontSize: 16
    },
    botaoVoltar:{
        backgroundColor: 'green',
        width: width*0.6,
        borderRadius: 15,
        padding: 15,
        alignSelf: 'center'
    },
    textoBotao:{
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    mensagems:{
        display: 'flex',
        flexDirection: 'collumn',
    },  
    item:{
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 10,
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        elevation: 5,
        width: width * 0.9,
        alignSelf: 'center'
    },
    nome:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 2
    },
    resposta:{
        backgroundColor: 'rgb(235, 235, 235)',
        borderRadius: 5,
        padding: 10,
        elevation: 5
    },
    status:{
        fontWeight: '600',
        paddingVertical: 5,
        fontSize: 20
    },
    statusAprovado:{
        color: 'green'
    },
    statusReprovado:{
        color: 'red'
    },
    statusPendente:{
        color:'rgb(133, 130, 0)'
    },
    respostaConteudo:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    input:{
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        borderRadius: 5,
        marginVertical: 10,
        flexWrap: 'wrap',
        
    },
    botaoDecisao:{
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 15,
        marginVertical: 8,
        elevation: 5
    },
    botaoAprova:{
        backgroundColor: 'rgb(169, 235, 143)',
    },
    botaoRecusa:{
        backgroundColor: 'rgb(231, 101, 101)',
        
    },
    textoBotaoDecisao:{
        textAlign: 'center',
        fontWeight:'regular'
    }
})

export default styles