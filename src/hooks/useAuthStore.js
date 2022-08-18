import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

//mandamos la informacion recibida al backend no usamos thunks lo hacemos de otra manera
export const useAuthStore = () => {

    //importamos useDispatch y useSelector para recibir la informacion de metodos 
    //y propiedades del store
    const { status, user, errorMessage } = useSelector( state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        
        dispatch( onChecking()); //llamamos a la funcion del store

        try {

            //mandamos los datos al backend, importamos el metodo calendarApi creado por
            //nosotros en api/calendarApi donde importamos axios y podemos hacer las peticiones
            //de la respuesta que obtenemos desestructuramos para seleccionar solo la data
            const { data } = await calendarApi.post('/auth', { email, password }); //hacemos un post donde mandamos el email y password para el login solo ponemos /auth porque en el metodo calendarApi ya usamos una variable de entorno donde especifica la http, como segundo parametro ponemos el email y el password del usuario logueado
            //almacenamos el token obtenido de la data en el local storage
            localStorage.setItem('token', data.token );
            //almacenamos en el local storage la fecha cuando obtenemos el token, para saber si el token aun
            //es permitido
            localStorage.setItem('token-init-date', new Date().getTime() );
            //usamos el metodo del storage y como payload le pasamos el name y el uid obtenido del data
            dispatch( onLogin ({ name: data.name, uid: data.uid}) );
            
        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas'));
            //limpiamos el mensaje de error pasados 0,10 segundos
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    return {
        
        //propiedades
        errorMessage,
        status,
        user,

        //metodos
        startLogin
    }
}