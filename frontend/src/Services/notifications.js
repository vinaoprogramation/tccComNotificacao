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





        } catch (error) {
            set({ mensagem: "Necessita Permissão Administrativa" })
        }
    },


    enviaResposta: async (requestId, responseMessage, decision) => {
    
        try {
          const response = await api.get(`/usuarios/registrar/request/resposta`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ requestId, responseMessage, decision })
          });    
          
    
        } catch (error) {
          console.error('Erro ao enviar resposta:', error);
        }
      },





}));


export default useNotification;