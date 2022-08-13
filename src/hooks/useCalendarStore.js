import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store";



export const useCalendarStore = () => {

    const dispatch = useDispatch(); //importamos de react-redux useDispatch para poder usar los metodos de los slices del store

    //usamos useSelector para poder acceder a las propiedades del initialState del calendarSlice a traves del store
    const { events, activeEvent } = useSelector(state => state.calendar);

    //metodo que llama al metodo onSetActiveEvent del calendarSlice
    const setActiveEvent = ( calendarEvent ) => {
        dispatch(onSetActiveEvent( calendarEvent));
    }

    return {

        //propiedades
        activeEvent,
        events,


         //metodos
         setActiveEvent,
    }
}
