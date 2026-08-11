import {
    StyleSheet,
    Dimensions
} from "react-native";


const {
    width,
    height
} = Dimensions.get("screen");



export const LARGURA_ABA =
    width * 0.8;


const styles = StyleSheet.create({
    conteudo:{
        padding: 20
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
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 5,
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    nome:{
        fontSize: 20,
        fontWeight: 'bold'
    },
    resposta:{
        backgroundColor: 'rgba(0, 0, 0, 0.23)',
        borderRadius: 5,
        padding: 10
    }
});


export default styles;