import { create } from 'zustand';
import api from './api';
const useMenu = create((set) => ({
    mostra: false,

    mudaMostraFuncao: (valorMostra) => {
        set({mostra: valorMostra})
    }

}));


export default useMenu;