
import { useCalendarStore, useUiStore } from "../../hooks"


export const FabDelete = () => {

    //importamos el Hook creado por nosotros useCalendarStore
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    //creamos una funcion que sera llamada al pulsar el boton de borrar
    const handleDelete = () => {

        startDeletingEvent(); //llamamos al metodo del Hook creado por mi useCalendarStore
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleDelete }
            //usamos la propiedad hasEventSelected del Hook creado por mi useCalendarStore
            //para que si esta en true no devuelva nada pero si esta en false sea none y por tanto no se muestre
            //el boton si no hay ninguna nota activa
            style = {{
                display: hasEventSelected ? '': 'none'
            }}
        >
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}
