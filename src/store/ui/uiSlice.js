
import { createSlice } from '@reduxjs/toolkit';

//creamos el slice para el ui usando el createSlice del reduxjs/toolkit
//hemos tenido que instalar en consola el toolkit con --> yarn add @reduxjs/toolkit
//ver video 353 y tambien instalar redux con yarn add react-redux

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen:false
    },
    reducers: {
     
        onOpenDateModal: ( state ) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: ( state ) => {
            state.isDateModalOpen = false;
        },

    }
});


// Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;