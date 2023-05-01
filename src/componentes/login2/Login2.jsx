import React, { useState } from "react";
import "firebase/auth";
import { userContext } from "../../storage/userContex";
import { useContext } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTriangleExclamation,} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import './logeo2.css'


const expresiones = {
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/, // 4 a 12 digitos.
  correo: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
};
const initialForm = {
  email: "",
  contraseña: "",
};
function Logeo() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const { iniciarCuenta } = useContext(userContext);
  const [check, setCheck] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  async function revicion(evt) {
    evt.preventDefault();
    if (
      expresiones.password.test(form.contraseña) &&
      expresiones.correo.test(form.email)
    ) {
      handlerSubmit(evt);
    } else {
      setCheck(true);
      setTimeout(() => {
        setCheck(null);
      }, 5000);
    }
  }
  const handlerSubmit = async (evt) => {
    evt.preventDefault();

    iniciarCuenta(form);
    Swal.fire({
      icon: "success",
      title: "HAS INICIADO SESION",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
    });
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="image">
      <div className="container_formulario_logeo">
        <div className="title_formulario_logeo">
          <h1>Iniciar sesion </h1>
        </div>
        <form onSubmit={revicion}>
          <div className="user_details_logeo">
            <div className="input_box">
              <input
                value={form.email}
                name="email"
                placeholder="email" 
                type="email"
                onChange={handleChange}
              />
            </div>
            <div className="input_box">
              <input
                value={form.contraseña}
                name="contraseña"
                placeholder="password"
                type="password"
                onChange={handleChange}
              />
            </div>
            <div className="reg_btn">
              <input type="submit" value="Aceptar" />
            </div>
          </div>
        </form>
        <div
          className={
            check === null
              ? "formulario__mensaje"
              : "formulario__mensaje_activo"
          }
        >
          <p>
            <FontAwesomeIcon
              className="icono_carro"
              icon={faTriangleExclamation}
            />
            <b>Error:</b> Por favor rellena el formulario correctamente.
          </p>
        </div>
       
          <p className="cambio">
            ¿No posee una cuenta?<Link to="/registro">Registrarse</Link>
          </p>
      </div>
      
    </div>
  );
}
export default Logeo;
