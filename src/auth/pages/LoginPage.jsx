
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';

//manejamos los dos formularios el de login y el de registro

const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export const LoginPage = () => {

    //importamos el Hook creado por nosotros en hooks/useAuthStore, usaremos el 
    //metodo startLogin en el metodo de abajo loginSubmit para enviar la informacion albackend
    const { startLogin, startRegister, errorMessage, } = useAuthStore();

    //usamos el custom Hook creado por nosotros useForm para manejar el formulario del Login
    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(registerFormFields);

    //usamos el custom Hook creado por nosotros useForm para manejar el formulario del Registro
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(loginFormFields);


    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword })
    }

    const registerSubmit = (event) => {
        event.preventDefault();
        if (registerPassword !== registerPassword2) {
            //comprobamos que las dos contraseñas introducidas por el usuario para el registro son iguales
            Swal.fire('Error en registro', 'Las contraseñas no son iguales', 'error');
            return;
        }

        //console.log  ({registerName, registerEmail, registerPassword, registerPassword2 });
        startRegister({ name: registerName, email: registerEmail, password: registerPassword });
    }

    //para estar oyendo los cambios del errorMessage usamos el Hook useEffect de React
    useEffect(() => {
        if (errorMessage !== undefined) {
            //usamos el Swall del paquete instalado del sweetAlert para mostrar el mensaje de error
            Swal.fire('Error en la autenticacion', errorMessage, 'error');
            return;
        }

    }, [errorMessage])


    return (

        //FORMULARIO LOGIN
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                {/* FORMULARIO REGISTRO */}
                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
