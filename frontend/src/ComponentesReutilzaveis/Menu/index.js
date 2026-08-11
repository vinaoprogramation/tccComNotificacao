import React from "react";

import {
    TouchableOpacity,
    Image
} from "react-native";

import styles from "./styles";

import menu from "../../../assets/menu.png";

import useMenu from "../../Services/menu";


export default function Menu() {

    const mostra = useMenu(
        (state) => state.mostra
    );

    const mudaMostraFuncao = useMenu(
        (state) => state.mudaMostraFuncao
    );


    return (

        <TouchableOpacity

            style={styles.fundo}

            onPress={() => {

                mudaMostraFuncao(
                    !mostra
                );

            }}

        >

            <Image
                source={menu}
                style={styles.imagemMenu}
            />

        </TouchableOpacity>

    );

}