//hemos instalado axios --> yarn add axios   para peticiones http
import axios from 'axios';
import { getEnVariables } from '../helpers';

const { VITE_API_URL }= getEnVariables(); //importamos las variables de entorno

const calendarApi = axios.create({
    baseURL: VITE_API_URL
});

//configurar interceptores cuando hacemos request, es lo que usamos con postman par el header donde guardamos el token en la variable x-token
calendarApi.interceptors.request.use( config => {

    //al hacer cualquier peticion ponemos el header con el valor del token almacenado en el localStorage
    //si no hay token es undefined y hacemos que el backend regrese que el usuario no esta autenticado
    config.headers = {
        ...config.headers, //esparcimos todos los headers en caso de que hayan mas en la variable recibida config
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default calendarApi;