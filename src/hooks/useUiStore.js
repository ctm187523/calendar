import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

//creamos un Hook para manejar el slice uiSlice con sus propiedades y metodos
export const useUiStore = () => {

    //usamos el useDispatch para poder usar los metodos de los slices del store
    const dispatch = useDispatch();

    //usamos el useSelector de react-redux para poder acceder a las propiedades del slice uiSlice ubicado en el store
    const { isDateModalOpen } = useSelector(state => state.ui);

    const openDateModal = () => {

        dispatch( onOpenDateModal()); //hacemos dispatch al metodo del uiSlice.js
    }

    const closeDateModal = () => {

        dispatch( onCloseDateModal() ); //hacemos dispatch al metodo del uiSlice.js
    }

    //construimos un toogle para que ejecute una funcion o otra dependiendo del estado del isDateModalOpen
    const tooggleDateModal = () => {

        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal()
    }

    return {

        //propiedades
        isDateModalOpen,

        //metodos
        openDateModal, closeDateModal, tooggleDateModal
    }
}