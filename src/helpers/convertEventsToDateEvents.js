import { parseISO } from "date-fns"


//metodo para pasar las fechas a un string formateado
export const convertEventsToDateEvents = ( events = [ ]) => {

    //recorremos los eventos com map y usamos el metodo de javascript parseIso
    //para transformar la fecha del evento end y start a string
    return events.map( event => {

        event.end = parseISO ( event.end);
        event.start = parseISO( event.start);  
        
        return event;
    })

}