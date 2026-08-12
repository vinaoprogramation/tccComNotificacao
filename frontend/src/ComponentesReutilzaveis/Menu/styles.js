import {
    StyleSheet,
    Dimensions
} from "react-native";


const {
    width
} = Dimensions.get("screen");


const styles = StyleSheet.create({
    fundo:{
        zIndex: 3
    },

    imagemMenu: {

        width: width * 0.15,

        height: width * 0.15,

        position: "absolute",
        marginTop: 50,
        marginLeft: 10,
        zIndex: 3

    }

});


export default styles;