import { create } from 'zustand';
import api from './api';


const useNotification = create((set) => ({
    notificacoes: [],
    mensagem: null,


    carregaNotificacoes: async () => {
        try {
            const response = await api.get('/usuarios/get/requests/admin');

            const answer = await response.data;

            set({ notificacoes: answer.requests })
            console.log(answer.requests)





        } catch (error) {
            console.log("Damn")
            set({ mensagem: "Necessita Permissão Administrativa" })
        }
    },



}));


export default useNotification;