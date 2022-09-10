import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete} from "../";
import { localizer, getMessagesEs } from '../../helpers';
import { useEffect, useState } from 'react';
import { useUiStore, useCalendarStore } from '../../hooks';





export const CalendarPage = () => {

    
    //importamos el Hook creado por nosotros en la carpeta Hooks useUiStore.js
    //para poder manejar el estado del Moda(ventana emergente)
    const { openDateModal } = useUiStore();

    //importamos el Hook creado por nosotros en la carpeta Hooks useCalendarStore.js
    //para poder manejar los eventos del calendario
    const { events, setActiveEvent, startLoadingEvents  } = useCalendarStore();


    //usamos el Hook useState de React para poder almacenar la vista(mes,dia,etc) donde la habiamos dejado y restablecerla
    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week'); //si el lasView es null lo restablecemos en la vista week

    //funcion para cambiar los estilos cuando suceda algo en el calendario
    const eventPropGetter = (event, start, end, isSelected) => {

        //console.log({ event, start, end, isSelected})

        const style = {
            backgroundColor: '#347CF7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    };

    //metodo que se dispara cuando el usuario hace doble click en el recuadro
    const onDoubleClick = (event) => {

        //al hacer doble click llamamos al metodo del Hook creado por nosotros useUiStore para cambiar el estado a true
        openDateModal();

    }

    //metodo que se dispara cuando el usuario hace click en el recuadro
    //manda el evento(el cuadro del calendario) que se haya echo click
    //llama al metodo del Hook creado por nosotros useCalendarStore y este
    //al metodo onSetActiveEvent del calendarSlice pasandole la informacion
    //del evento seleccionado 
    const onSelect = (event) => {

        setActiveEvent(event);
    }

    //metodo que se dispara cuando la vista cambia por ejemplo cambiar de mes a semana
    const onViewChanged = (event) => {

        console.log({ viewChange: event });
        //grabamos la vista en el locaStorage asi lo restablecemos donde lo habiamos dejado
        localStorage.setItem('lastView', event); //cambiamos el valor del lastVie del useState creado arriba por el del event recibido al cambiar la vista
        setlastView(event); //usamos el setlastView del useState creado arriba y le pasamos el event, auqnue no haria falta
    }

    //usamos el Hook de React useEffect para que al cargar la pantalla llame a metodo
    //startLoadingEvents del hook useCalendarStore creado por nosotros y cargue todos los eventos del backend
    //no le ponemos dependencias solo queremos cargarlo una vez
    useEffect(() => {
        
        startLoadingEvents()
       
    }, []);


    return (
        <>
            <Navbar />

            <Calendar
                culture='es' //en culture="es" pone el calendario en español aunque no todo
                //importamos el localizer del archivo helpers/calendarLocalizer
                localizer={localizer}
                // le pasamos los eventos de calendario del hook creado por nosotros useCalendarStore
                events={events}
                //ponemos la vista por defecto que queramos al abrir el calendario usamos la variable lastView que sera la vista almacenada en el localStorage
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                //para el alto hacemos el calculo del 100 por cien menos 80px del navbar
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={getMessagesEs()} //importamos de helpers/getMessagesEs el metodo del archivo para poner completamente todo en español
                eventPropGetter={eventPropGetter} //llama a la funcion creada arriba
                //en el atriubuto components importamos el componente CalendarEvent creado en calendar/components/CalendarEvents para
                //personalizar el cuadro del evento
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick} //llamamos a la funcion creada arrina onDoubleClick
                onSelectEvent={onSelect} //llamamos a la funcion creada arrina onSelect
                onView={onViewChanged} //llamamos a la funcion creada arrina onView
            />

            {/* colocamos el componente creado en calendar/components/CalendarModal 
            para que pueda salir la ventana emergente(popup)*/}
            <CalendarModal />

            {/* agregamos el boton flotante que creamos en el archivo calendar/components/FabAddNew */}
            <FabAddNew />

             {/* agregamos el boton flotante que creamos en el archivo calendar/components/FabDelete */}
             <FabDelete />
        </>
    )
}
