import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';

import { Navbar, CalendarEvent } from "../";
import { localizer, getMessagesEs } from '../../helpers';



const events = [{
    title: 'Cumpleaños de Pepe',
    notes: 'Hay que comprar un pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
        _id: '123',
        name: 'Manue'
    }
}]



export const CalendarPage = () => {

    //funcion para cambiar los estilos cuando suceda algo en el calendario
    const eventPropGetter = ( event, start, end, isSelected ) => {
        //console.log({ event, start, end, isSelected})

        const style = {
            backgroundColor: '#347CF7',
            borderRadius:'0px',
            opacity: 0.8,
            color: 'white'
        }

        return {
            style
        }
    };

    return (
        <>
            <Navbar />

            <Calendar
                culture='es' //en culture="es" pone el calendario en español aunque no todo
                //importamos el localizer del archivo helpers/calendarLocalizer
                localizer={localizer}
                // le pasamos los eventos, el objeto events creado arriba
                events={events}
                startAccessor="start"
                endAccessor="end"
                //para el alto hacemos el calculo del 100 por cien menos 80px del navbar
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={ getMessagesEs() } //importamos de helpers/getMessagesEs el metodo del archivo para poner completamente todo en español
                eventPropGetter= { eventPropGetter } //llama a la funcion creada arriba
                //en el atriubuto components importamos el componente CalendarEvent creado en calendar/components/CalendarEvents para
                //personalizar el cuadro del evento
                components= {{
                    event: CalendarEvent
                }}
            />


        </>
    )
}
