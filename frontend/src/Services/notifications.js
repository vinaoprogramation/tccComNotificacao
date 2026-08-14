import { create } from 'zustand';
import api from './api';



const useNotification = create((set) => ({
    notificacoes: [],
    notificacoesUser: [],
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






    carregaNotificacoesUser: async () => {
        try {
            const response = await api.get('/usuarios/get/requests/user');

            const answer = await response.data;

            set({ notificacoesUser: answer.requests })


        } catch (error) {
            set({ mensagem: "Não existem requisições no momento" })
        }
    },






    enviaResposta: async (requestId, responseMessage, decision) => {
      
        try {
          const response = await api.post(`/usuarios/registrar/request/resposta`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: requestId, responseMessage, decision
          });    
          
    
        } catch (error) {
          console.error('Erro ao enviar resposta:', error);
        }
      },



      enviaRequest: async (material, filamentColor, weight) => {
      
        try {
          const response = await api.post(`/usuarios/registrar/request`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: material, filamentColor, weight
          });    
          
    
        } catch (error) {
          console.error('Erro ao enviar resposta:', error);
          console.log(error.response.data)
        }
      },




}));


export default useNotification;