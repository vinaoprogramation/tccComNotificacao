import { create } from 'zustand';
import { storeToken, getToken, removeToken } from './authStorage';

import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';
const baseUrl = isWeb 
  ? 'http://localhost:3000/usuarios' 
  : 'http://10.0.2.2:3000/usuarios';

const useTokenStore = create((set, get) => ({
  autenticado: false,
  user: null,
  mode: false,

  login: async (username, password) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });


      const answer = await response.json();
      
      await storeToken(answer.token);

      console.log(answer.foto)

      
      if (answer.token) {
        set({ autenticado: true, user: { username: answer.username, foto: answer.foto } });
        console.log(get().user)
        if(answer.role == 'admin'){
          set({mode: true})
        } else{
          set({mode: false})
        }
      }      

    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  },


  registrar: async (username, password) => {

    try {
      const response = await fetch(`${baseUrl}/registrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
      const answer = await response.json();

      await storeToken(answer.token);

      if (answer.token) {
        set({ autenticado: true, user: { username: answer.username } });
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