//hemos instalado axios --> yarn add axios   para peticiones http
import axios from 'axios';
import { getEnVariables } from '../helpers';

const { VITE_API_URL }= getEnVariables(); //importamos las variables de entorno

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

//configurar interceptores


export default calendarApi;