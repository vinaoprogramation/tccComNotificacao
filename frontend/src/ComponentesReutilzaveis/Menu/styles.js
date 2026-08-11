import {
    StyleSheet,
    Dimensions
} from "react-native";


const {
    width
} = Dimensions.get("screen");


const styles = StyleSheet.create({

    fundo: {

        zIndex: 3,

        borderBottomRightRadius: 10,

        elevation: 5,

        borderRadius: 100,

        marginLeft: 5,

        marginTop: 5

    },


    imagemMenu: {

        width: width * 0.15,

        height: width * 0.15,

        position: "absolute"

    }

});


export default styles;