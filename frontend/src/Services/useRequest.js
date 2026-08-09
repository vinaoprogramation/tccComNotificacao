import { create } from 'zustand';
import api from './api';
import useTokenStore from './useTokenStore';


const useRequest = create((set) => ({

  enviaRequest: async () => {
    const user = useTokenStore((state) => state.user);
    const id = user.userId
    const mensagemTeste = 'Mensagem Teste'
    try {
      const response = await api.get('/usuarios/registrar/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, mensagemTeste })
      });
      
    } catch (error) {
      console.error('Error fetching catalogo:', error);
    }
  },


}));

export default useRequest;