import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { store } from "./store"


export const CalendarApp = () => {
    return (

        //el Provider es para que toda la aplicacion acceda al store
        //el BrowserRouter para que toda la aplacion acceda a las Routes
        <Provider store={store}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </Provider>

    )
}
