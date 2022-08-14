import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";



export const useCalendarStore = () => {

    const dispatch = useDispatch(); //importamos de react-redux useDispatch para poder usar los metodos de los slices del store

    //usamos useSelector para poder acceder a las propiedades del initialState del calendarSlice a traves del store
    const { events, activeEvent } = useSelector(state => state.calendar);

    //metodo que llama al metodo onSetActiveEvent del calendarSlice
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    //metodo para salvar una nota
    const startSavingEvent = async (calendarEvent) => {

        // TODO: llegar al backend el nuevo evento

        //Si sale todo bien y el calendarEvent tiene el id significa que estoy
        //actualizando en caso contrario estoy creando una nueva nota
        if (calendarEvent._id) {
            //actualizando, llamamos al metodo del calendarSlice
            dispatch(onUpdateEvent({ ...calendarEvent }));
        } else {
            //creando una nueva nota, llamamos al metodo del calendarSlice
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() })) //creamos y añadimos un _id al calendarEvent
        }

    }

     //metodo que llama al metodo onDeleteEvent del calendarSlice para borrar una nota
    const startDeletingEvent = () => {

        //TODO: LLegar al backend para que sea eliminado
        dispatch(onDeleteEvent());
    }

    return {

        //propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent, //retorna false si el activeEvent es null, true si no es null


        //metodos
        setActiveEvent,
        startDeletingEvent,
        startSavingEvent,
    }
}
