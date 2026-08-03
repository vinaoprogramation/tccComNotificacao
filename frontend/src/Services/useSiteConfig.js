import { create } from 'zustand';
import api from './api';

const useSiteConfig = create((set) => ({
  informacoes: {},

  load: async () => {
    try {
      const response = await api.get('/site-config',);
      set({ informacoes: response.data.dados.configuracao });
    } catch (error) {
      console.error('Error fetching dados:', error);
    }
  },


}));

export default useSiteConfig;