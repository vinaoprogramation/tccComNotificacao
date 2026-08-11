import { create } from 'zustand';
import api from './api';

import useTokenStore from './useTokenStore';
export default function Notification() {
    const userId = useTokenStore((state) => state.userid)

    create((set) => ({
        notificacoes: [],


        carregaNotificacoes: async () => {
            try {
                const response = await fetch('get/requests/admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId })
                });


                const answer = await response.json();

                set({ notificacoes: answer.requests })
                console.log(answer.requests)

                if (answer.token) {
                    set({ autenticado: true, user: { username: answer.username, role: answer.role } });
                }

            } catch (error) {
                console.error('Erro ao fazer login:', error);
            }
        },



    }));
}

