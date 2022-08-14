import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"


export const FabAddNew = () => {

    //importamos el Hook creado por nosotros useUiStore
    const { openDateModal } = useUiStore();

    //importamos el Hook creado por nosotros useCalendarStore
    const { setActiveEvent } = useCalendarStore();

    //creamos una funcion que sera llamada al pulsar el boton
    const handleClickNew = () => {

        //usamos el metodo setActive del hook creado por mi useCalendarStore
        //reseteamos los valores nuevos al ser pulsado el boton pero sin el id, ya que el id se utilizara
        //para diferenciar si es una nota activa o no ya que la nota activa si tiene id pero si estamos creando una 
        //nueva nota no lleva id
        setActiveEvent({

            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Manue'
            }
        });

        openDateModal(); //llamamos a la funcion del Hook creado por mi useUiStore
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
