import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

const useTokenStore = create((set) => ({
  autenticado: false,
  user: null,
  id:null,

  login: async (username, password) => {
    try {
      const response = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });


      const answer = await response.json();
      
      await storeToken(answer.token);

      if (answer.token) {
        set({ autenticado: true, user: { username: answer.username, role: answer.role, id: answer.userId } });
      }      

    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  },


  registrar: async (username, password) => {

    try {
      const response = await fetch('http://localhost:3000/usuarios/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
      const answer = await response.json();

      await storeToken(answer.token);

      if (answer.token) {
        set({ autenticado: true, user: { username: answer.username, role: answer.role } });
      }
      

    } catch (error) {
      console.error('Erro ao fazer registro e login:', error);
    }
  },

  logout: async() => {
    await removeToken();

    set({autenticado: false})
  }


}));

export default useTokenStore;