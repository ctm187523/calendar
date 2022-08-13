
import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice, uiSlice } from "./";


//creamos el store con configureStore de reduxjs/toolkit
//hemos tenido que instalar en consola el toolkit con --> yarn add @reduxjs/toolkit
//ver video 353 y tambien instalar redux con yarn add react-redux

export const store = configureStore({

    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer
    }
})