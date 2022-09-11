import { Provider } from "react-redux"
import { BrowserRouter, HashRouter } from "react-router-dom"
import { AppRouter } from "./router"
import { store } from "./store"


export const CalendarApp = () => {
    return (

        //el Provider es para que toda la aplicacion acceda al store
        //el BrowserRouter para que toda la aplacion acceda a las Routes
        //usamos el HashRouter en vez del BrowserRouter para produccion ver video 428 finalmente no lo usamos ver video 428
        <Provider store={store}>
            <BrowserRouter>
            {/* <HashRouter> */}
                <AppRouter />
            {/* </HashRouter> */}

            </BrowserRouter>
        </Provider>

    )
}
