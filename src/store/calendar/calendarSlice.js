
import { createSlice } from '@reduxjs/toolkit';
//import { addHours, startOfYesterday } from 'date-fns';

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: 'Cumpleaños de Pepe',
//     notes: 'Hay que comprar un pastel',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//         _id: '123',
//         name: 'Manue'
//     }
// };

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [
            //tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        //metodo para poner la nota activa
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        //metodo para añadir al array de arriba events una nueva nota
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null; //limpiamos la nota activa

        },
        //metodo para actualizar una nota(evento)
        onUpdateEvent: (state, { payload }) => {
            //la funcion map de javascript retorna un nuevo arreglo
            state.events = state.events.map(event => {

                //si coincide el id con el pasado por parametro retornamos
                //el payload completo donde esta toda la informacion actualizada
                if (event.id === payload.id) {
                    return payload;
                }

                return event;
            });
        },

        //metodo para borrar una nota(evento)
        onDeleteEvent: (state) => {

            //si el activeEvent no es null
            if (state.activeEvent) {
                //usamos el metodo de javaScript filter para retornar todos los eventos  que no coinciden el id del evento con el id del evento activo
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null; //borramos la nota activa
            }

        },
        //reducer para cargar los eventos ubicados en el localStorage, lo usamos en el useCalendarStore en la funcion startLoadingEvents
        onLoadEvents: ( state, { payload = [] }) => {
            state.isLoadingEvents = false;

            //con la instruccion de abajo ya valdria pero lo haremos mas abajo diferente
            //por si en un futuro queremos llamar mas de una vez a esta funcion por ejemplo 
            //hacer paginaciones al agregar eventos nuevos
            //state.events = payload; 

            //barremos el payload y confirmamos si ya tenemos el evento insertado a traves del id
            //si no lo tenemos lo insertamos
            payload.forEach( event  => {

                //usamos la instruccion some que nos devuelve un valor booleano si encuentra un id igual en el state.events
                const exists = state.events.some( dbEvent => dbEvent === event.id );

                    //si no existe añadimos el evento al array del state events
                    if( !exists) {
                        state.events.push( event );
                    }
            });
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents } = calendarSlice.actions;