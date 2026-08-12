import { create } from 'zustand';


const changeComponent = create((set, get) => ({
  componente: 'HomeScreen',

  mudarComponente: (componenteIr) => {
    
    set({componente: componenteIr})
    console.log(get()?.componente)
  }

}));


export default changeComponent;