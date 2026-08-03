import { create } from 'zustand';
import api from './api';
const useCatalogo = create((set) => ({
  projetos: [],

  load: async () => {
    try {
      const response = await api.get('/catalogo',);
      set({ projetos: response.data.projetos });
    } catch (error) {
      console.error('Error fetching catalogo:', error);
    }
  },


}));

export default useCatalogo;