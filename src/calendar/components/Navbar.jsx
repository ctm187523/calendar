


export const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                {/* usamos los iconos de fontawesome */}
                <i className="fas fa-calendar-alt"></i>
                {/* hacemos una separacion con &nbsp; */}
               &nbsp;
               Clemente
           </span>
            <button className="btn btn-outline-danger " >
                {/* usamos los iconos de fontawesome */}
                <i className="fas fa-sign-out-alt"></i>
                <span>Salir</span>
            </button>
        </div>
    )
}
