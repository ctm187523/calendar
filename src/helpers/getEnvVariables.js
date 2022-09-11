//creamos esta funcion para manejar las variable de entorno

export const getEnVariables = () => {

    //import.meta.env; //importamos el paquete para las varaibles de entorno

    return{
        VITE_API_URL: import.meta.env.VITE_API_URL,
        //...import.meta.env //retornamos y esparcimos las variables
    } 
}