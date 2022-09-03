import { useAuthStore } from "../../hooks"



export const Navbar = () => {

    //usamos el Hook creado por nosotros 
    const { startLogout, user } = useAuthStore();
    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                {/* usamos los iconos de fontawesome */}
                <i className="fas fa-calendar-alt"></i>
                {/* hacemos una separacion con &nbsp; */}
               &nbsp;
               {user.name}
            </span>
            <button
                className="btn btn-outline-danger"
                onClick={startLogout}
            >
                {/* usamos los iconos de fontawesome */}
                <i className="fas fa-sign-out-alt"></i>
                {/* ponemos un espacio en blanco */}
                &nbsp;
                <span>Salir</span>
            </button>
        </div>
    )
}
