//creamos una modal(ventana emergente o popup) hemos instalado en la consola
//la dependencia de react-modal --> yarn add react-modal
//y importado los paquetes de esta instalacion de react-modal video 348
//tambien hemos importado para que aparezca el calendario React-date-picker --> yarn add react-datepicker   ver video 350
// usamos tambien sweetalert2 que ya sse habia usado en otros projectos para construir
//una ventana de error o informacion lo instalamos por consola --> yarn add sweetalert2

import { useEffect, useMemo, useState } from 'react';

//react-modal
import Modal from 'react-modal';

//importamos sweetalert2 para mensajes de error o informacion
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css' //estilos para el sweetalert2

//react-date-picker
import DatePicker, { registerLocale } from "react-datepicker"; //el registerLocale espara poner el calendario en español
import "react-datepicker/dist/react-datepicker.css"; //para el estilo del datepicker
import { addHours } from 'date-fns';
import es from 'date-fns/locale/es'; //para que sea en español usamos la importacion es abajo en el registerLocale
import { differenceInSeconds } from 'date-fns/esm';
import { useCalendarStore, useUiStore } from '../../hooks';
import { id } from 'date-fns/esm/locale';

//el registerLocale espara poner el calendario en español
registerLocale('es', es)

//copiado de la pagina de react-modal para dar la posicion a la ventana emenrgente
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

//esta linea de codigo espara que la ventana emergente se sobreponga a la ventana principal 
//ponemos #root que es donde en el archivo index.html hace referencia al root  <div id="root"></div> 
//luego en el main.jsx hace referencia a este root del index.html --> ReactDOM.createRoot(document.getElementById('root')).render(
Modal.setAppElement('#root');

export const CalendarModal = () => {

    //exportamos el hook  useUiStore creado por nosotros en hooks para manejar el estado del modal(ventana emergente)
    const { isDateModalOpen, closeDateModal } = useUiStore();

    //exportamos el hook  useCalendarStore creado por nosotros en hooks para los eventos de calendario
    const { activeEvent, startSavingEvent } = useCalendarStore();

    //usamos el Hook de React useState para el formulario
    const [formValues, setFormValues] = useState({

        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2), //usamos el metodo addHour de date-fns para añadir horas 
    });

    // utilizamos el Hook useState para comprovar el estado del formulario si se ha dado postear el form o no, si se ha llamado a la funcion onSubmit
    const [formSubmited, setFormSubmited] = useState(false);

    //usamos el Hook de React useMemo para memorizar el valor de titleClass, que sera el valor 
    //que pondremos en el input del formulario para el title, la idea es que si al hacer submit 
    //el title esta vacio se marque en rojo
    //como dependencias para que cambie el valor del memo ponemos el formValues.title y formSubmited de los dos Hooks de arriba
    const titleClass = useMemo(() => {

        if (!formSubmited) return ''; //si el formulario no se ha disparado devolvemos un String vacio

        //si el titulo es mayor que 0 osea que no esta vacio ponemos la propiedad is-valid y el recuadro del titulo se pone en verde
        //en caso contrario toma la propiedad is-invalid y se pone en rojo
        //si no queremos que muestre en verde la validacion pondriamos ? '' un String vacio
        return (formValues.title.length > 0)
            ? 'is-valid'
            : 'is-invalid'

    }, [formValues.title, formSubmited])

    //usamos el Hook de React useEfect, como dependecia usamos el activeEvent del Hook creado por nosotros useCalendarStore declarado arriba
    useEffect(() => {
        
        //ejecutamos el codigo siempre que activeEvent no sea nulo
        if( activeEvent !== null){
            //usamos el setFormValues del useState creado arriba para manejar el formulario
            //y le pasamos el activeEvent que es el el evento activo acumulado en el Redux
            //de esta manera el formulario del modal cambia sus valores
            setFormValues({ ...activeEvent})
        }

    }, [activeEvent])

    //funcion para actualizar la fecha elegida del calendario, en el 
    //parametro changing definimos si es la fecha end o start
    const onDateChange = (event, changing) => {

        //usamos el hook useState creado arriba para el fromulario
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }


    //metodo que se llama cuando se cierra el modal
    const onCloseModal = () => {

        closeDateModal(); //llamamos al metodo del Hook creado por nosotros useUiStore declarado arriba

    }

    //metodo para ir cambiando los valores del formulario a medida que los introduce el usuario
    //del event que recibimos desestructuramos el target
    const onInputChange = ({ target }) => {

        //usamos el setFormValues del useState creado arriba para el formulario
        setFormValues({
            ...formValues, //usamos el spread para mantener todas las variables en su estado
            [target.name]: target.value //queremos cambiar la propiedad de la  que el name este siendo modificado y le damos el value, usamos las propiedades computadas de los objetos [name]
        });

    }

    //metodo para el posteo del formulario del modal(ventana emergente)
    const onSubmit = async(event) => {

        event.preventDefault(); //para evitar la propagacion del formulario

        //usamos el Hook creado arriba para cambiar el estado del formulario a true ya que se ha echo submit
        setFormSubmited(true);

        //comprobamos que la fecha final sea mayor que la inicial usando la funcion differeceInSeconds de date-fns
        const difference = differenceInSeconds(formValues.end, formValues.start);

        //usamos la funcion isNaN de JavaScript para verificar que tengamos por respuesta un numero
        // o que sea un valor negativo
        if (isNaN(difference) || difference <= 0) {
            //usamos sweetalert2 importado arriba
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        //verificamos tambien que tenga el titulo 
        if (formValues.title.length <= 0) return;

        console.log(formValues);

        //llamamos al metodo del Hook creado por nosotros useCalendarStore
        //para que grabe la nueva nota creada, le pasamos el fomrValues del useState creado
        //arriba para manejar el formulario
        await startSavingEvent( formValues);

        //cerramos el modal
        closeDateModal();

        setFormSubmited(false); //cambiamos el estado a false del useState creado arriba porque hemos finalizado el submited


    }

    return (

        <Modal
            //atributos copiados de la web de React-Modal
            isOpen={isDateModalOpen} //atributo para mostrar o no la ventana emergente(el modal), usamos el Hook creado por nosotros useUiSotore de la carpeta hooks y declarado arriba
            onRequestClose={onCloseModal} //llama al metodo de arriba onCloseModal
            style={customStyles} //llama al objeto creado arriba fuera del componente customStyles para situar la ventana emergente
            className="modal" //usamos los estilos del archivo styles.css
            overlayClassName="modal-fondo" //usamos los estilos del archivo styles.css, en este caso el estilo de fondo
            closeTimeoutMS={200} //ajustamos el tiempo para cerrar el modal
        >
            {/* codigo html para la construcion del modal(ventana emergente) */}
            <h1> Nuevo evento </h1>
            <hr />
            <form
                className="container"
                onSubmit={onSubmit} //llamamos a la funciomn creada arriba para el posteo del formulario
            >

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    {/* usamos el componente DatePicker importado de react-datepicker ver video 350 */}
                    <DatePicker
                        selected={formValues.start} //usamos la fecha seleccionada, utilizamos el useState para el formulario
                        onChange={(event) => onDateChange(event, 'start')}             //el onChange da el evento que es el valor e la nueva fecha seleccionada
                        className="form-control" //usamos bootstrap
                        dateFormat="Pp" //con esta argumento incluimos horas y minutos
                        showTimeSelect //esto hace que podamos seleccionar tambien las horas y minutos del calendario
                        locale="es" //le decimos que lo ponga en español
                        timeCaption="Hora" //le decimos que envez de Time ponga hora
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    {/* usamos el componente DatePicker importado de react-datepicker ver video 350 */}
                    <DatePicker
                        minDate={formValues.start} //le decimos que no puede tener una fecha anterior a la fecha del start
                        selected={formValues.end} //usamos la fecha seleccionada, utilizamos el useState para el formulario
                        onChange={(event) => onDateChange(event, 'end')}             //el onChange da el evento que es el valor e la nueva fecha seleccionada
                        className="form-control" //usamos bootstrap
                        dateFormat="Pp" //con esta argumento incluimos horas y minutos
                        showTimeSelect //esto hace que podamos seleccionar tambien las horas y minutos del calendario
                        locale="es" //le decimos que lo ponga en español
                        timeCaption="Hora" //le decimos que envez de Time ponga hora
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        // evaluamos mediate la constante titleClass creada arriba si el title al hacer submit esta vacio
                        //en ese caso hacemos que la entrada del titulo se marque en rojo
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        //le damos valores al useState para el formulario usado arriba
                        value={formValues.title}
                        onChange={onInputChange} //al cambiar el formulario llamamos al metodo creado arriba onImputChange

                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        //le damos valores al useState para el formulario usado arriba
                        value={formValues.notes}
                        onChange={onInputChange} //al cambiar el formulario llamamos al metodo creado arriba onImputChange
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
