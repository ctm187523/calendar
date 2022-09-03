import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";


export const AppRouter = () => {

    //const authStatus = 'not-authenticated'; //'not-authenticated'; //'authenticated'

    //usamos el hook creado por nosotros useAuthStore y tomamos el status y el 
    //metodo checkAuthToken donde en el hook useEffect de React de abajo lo usaremos
    const { status, checkAuthToken } = useAuthStore();

    //utilizamos el Hook de React useEffect donde no ponemos ningura dependencia y llame
    //al metodo checkAuthToken para ver el estado del Token 
    useEffect(() => {
        checkAuthToken();
    }, [])


    if (status === 'checking') {

        return (
            <h3>Cargando...</h3>
        )
    }

    return (
        <Routes>
            {
                //condicion ternaria
                (status === 'not-authenticated')
                    ? (
                        <>
                            <Route path="/auth/*" element={<LoginPage />} />
                            {/* navegamos a la ruta /auth/login */}
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="/" element={<CalendarPage />} />
                            {/* navegamos a la ruta / */}
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )
            }


        </Routes>
    )
}
