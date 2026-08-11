import { create } from 'zustand';
import api from './api';


const useNotification = create((set) => ({
    notificacoes: [],


    carregaNotificacoes: async () => {
        try {
            const response = await api.get('/usuarios/get/requests/admin');
            
            const answer = await response.data;

            set({ notificacoes: answer.requests })
            console.log(answer.requests)

            if (answer.token) {
                set({ autenticado: true, user: { username: answer.username, role: answer.role } });
            }

        } catch (error) {
            console.error('Erro ao pegar as requests:', error);
        }
    },



}));


export default useNotification;