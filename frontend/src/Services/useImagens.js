import { create } from 'zustand';
import api from './api';

const useImagens = create((set) => ({
  load: async (id) => {
    try {
      const response = await api.get(`/imagens/thumbnail/${id}`)      
  
    } catch (error) {
      console.error('Error fetching dados:', error);
    }
  },


}));

export default useImagens;