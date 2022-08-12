
import { parse, startOfWeek, getDay, format } from 'date-fns';

//cambiamos del ingles al español en calendario
import esEs from 'date-fns/locale/es';
import { dateFnsLocalizer } from 'react-big-calendar';

//archivo utilizado en CalendarPage.jsx para configurar el calendario
//hemos instalado para manejar el calendario react-big-calendar:
// yarn add react-big-calendar  
//ver video 344
//tambien hemos instalado date-fns --> yarn add date-fns

//codigo copiado de la web big-calendar ver video 344
const locales = {
    'es': esEs,
};

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
