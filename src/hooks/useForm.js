


import { useEffect, useMemo, useState } from 'react';

//variamos el useForm original toma en este caso dos argumentos initialForm y formValidations
export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);

    //usamos el useState de React para validar el formulario para ver si hay un error, nuevo metodo
    //usamos el useState de React para que si hay un cambio se renderize el estado
    const [formValidation, setformValidation] = useState({});

    //usamos el Hook de React useEffect para controlar cuando queremos que se dispare
    //el metodo de abajo createValidators, se disparara cada vez que el formState cambie
    useEffect(() => {
        createValidators();

    }, [formState])

    //utilizamos el useEffect de React para que se dispare cuando el initialForm cambie asi
    //al cambiar el active del archivo jornalSlice.js porque se ha seleccionado una nota del menu 
    //lateral o se ha creado una nueva nota se modifica el initialForm y crea un disparo
    useEffect(() => {
        setFormState(initialForm); //usamos el setFormState del useState usado arriba para modificar el estado si el formulario inicial cambia
    }, [initialForm])

    //constante que se encargara de ver si el formulario es valido, usaremos
    //el hook useMemo de React para que memorize su contenido
    //y solo cambie  si cambia el formValidation
    const isFormValid = useMemo(() => {

        //tenemos que iterar el formValidation y comprovar que todos sus valores sean null para
        //ver que no tiene ningun error si no es null entonces tiene el mensaje de error correspondiente
        //usamos el bucle forof propio de javascript
        for (const formValue of Object.keys(formValidation)) {
            if (formValidation[formValue] !== null) return false;
        }

        //en caso de que cualquier valor evaluado arriba de true sale de la funcion y retorna false el isFormValid
        //si ninguno es true retorna el isFormValid tal como indica la linea de abajo true
        return true;

    }, [formValidation])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    //metodo para validar las entradas del usuario, metodo nuevo respecto al hook original que creamos
    const createValidators = () => {

        //creamos una constante que usaremos mas abajo en la linea 50
        const formCheckedValues = {};

        //creamos un bucle forof(bucle propio de javascript) para recorrer la informacion recibida y hacer las validaciones
        //el formValidations es el objeto recibido como segundo  parametro en el Hook useForm linea 6
        for (const formField of Object.keys(formValidations)) {

            //desestructuramos la funcion y el mensaje de error que contiene ahora la variable formField ver lineas 20,21,22 del RegisterOage.jsx
            const [fn, errorMessage] = formValidations[formField];

            //creamos una propiedad computada dara el resultado de displayNameValid, emailValid, passwordValid
            // y sera igual a la ejecucion de la funcion que le pasaremos como argumento  el valor del formulario(formState ver linea 8) en el formField correspondiente al bucle
            //si se cumple la condicion de la funcion pondremos null y en caso contrario el error correspondiente
            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        //le daremos el nuevo valor al setFormValidations del Hook useState creado en la linea 12
        setformValidation(formCheckedValues);


    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        //retornamos los nuevos valores creados a partir del segundo arguemnto recibido
        ...formValidation,
        isFormValid
    }
}