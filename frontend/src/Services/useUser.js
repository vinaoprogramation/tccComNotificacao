import { create } from 'zustand';
import api from './api';
import useTokenStore from './useTokenStore';


const useUser = create((set) => ({

  enviaFoto: async (photoUrl) => {
    console.log("Zustand: "+photoUrl)
    
    try {
      const response = await api.post('/usuarios/registrar/foto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(photoUrl)
      });
      
    } catch (error) {
      console.error('Erro ao enviar a foto:', error);
    }
  },


}));

export default useUser;