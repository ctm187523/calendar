import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store";



export const useCalendarStore = () => {

    const dispatch = useDispatch(); //importamos de react-redux useDispatch para poder usar los metodos de los slices del store

    //usamos useSelector para poder acceder a las propiedades del initialState del calendarSlice a traves del store
    const { events, activeEvent } = useSelector(state => state.calendar);

    //obtenemos el usuario activo que esta autenticado en el store mediante el metodo de React useSelector
    const { user } = useSelector(state => state.auth);

    //metodo que llama al metodo onSetActiveEvent del calendarSlice
    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    //metodo para salvar una nota
    const startSavingEvent = async (calendarEvent) => {

        try {


            //Si sale todo bien y el calendarEvent tiene el id significa que estoy
            //actualizando en caso contrario estoy creando una nueva nota
            if (calendarEvent.id) {

                //actualizamos en el backend usando el archivo calendarApi y utilizamos PUT, ponemos la direccion y mandamos el calendarEvent actualizado
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

                //actualizamos enb el store, llamamos al metodo del calendarSlice
                dispatch(onUpdateEvent({ ...calendarEvent, user })); //añadimos tambien el user que es el usuario activo autenticado lo sacamos de la linea 15
                return;
            }
            //en caso de que no sea una actualizacion se ejecuta el siguiente codigo ya que no entra en el if y no ejecuta el return

            //hacemos la peticion a la base de datos para agregar un nuevo evento usando el archivo CalendarApi creado por nosotroa
            const { data } = await calendarApi.post('/events', calendarEvent);

            //creando una nueva nota, llamamos al metodo del calendarSlice para agregar la nueva nota en el store
            //creamos y añadimos el id para el store sacado de la respuesta del servidor, al crear un nuevo evento el servidor crea un id y nosotros lo recogemos y se lo añadimos para el store
            //añadimos tambien el user que es el usuario activo autenticado lo sacamos de la linea 15
            dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));

        //manda un error en el caso de que un usuario modifique una nota que no es suya
        } catch (error) {

            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');

        }



    }

    //metodo que llama al metodo onDeleteEvent del calendarSlice para borrar una nota
    const startDeletingEvent = async () => {

        //accedemos al backend para eliminar el evento seleccionado
        try {

            //usamos el archivo calendarApi odnde utilizamos delete y le pasamos la direccion donde incluimos el evento activo a eliminar
            await calendarApi.delete(`/events/${activeEvent.id}`);

            //llamamos a la funcion del store onDeleteEvent para eliminar el evento
            dispatch(onDeleteEvent());
            
        } catch (error) {
            
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

        
    }

    //metodo para cargar los eventos que tenemos en el backend
    //lo usaremos en el archivo CalendarPage para que se carguen los eventos al iniciarse
    const startLoadingEvents = async () => {

        try {

            //usamos el archivo creado por nosotros calendarApi y usamos un get para recibir los eventos
            const { data } = await calendarApi.get('/events');
            //usamos el archivo en helpers/onvertEventsToDateEvents para transformar las fechas de start y end a String
            const events = convertEventsToDateEvents(data.eventos);
            //llamamos a la funcion onLoadEvents del calendarSlice para insertar en el store los eventos almacenados en el backend
            dispatch(onLoadEvents(events));

        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
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
        startLoadingEvents
    }
}
