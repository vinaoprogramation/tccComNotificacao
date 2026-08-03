import { create } from 'zustand';
import api from './api';

const useImagens = create((set) => ({
  load: async () => {
    try {
      const response = await api.get(`/imagens/thumbnail/69`,);
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching dados:', error);
    }
  },


}));

export default useImagens;