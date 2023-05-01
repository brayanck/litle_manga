import React, { useState } from "react";
import 'firebase/auth'
import { userContext } from "../../storage/userContex";
import { useContext } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";
import { useNavigate ,Link} from "react-router-dom";
import './regitro.css'



const expresiones = {
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/, // 4 a 12 digitos.
	correo: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ,
};
const initialForm = {
    email: "",
    contraseña: "",
    contraseña2:"",
  };
export default function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [check, setCheck] = useState(null);
  const { crearCuenta} = useContext(userContext);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  async function revicion(evt){
    evt.preventDefault()
    if(expresiones.password.test(form.contraseña)&&expresiones.correo.test(form.email)&& form.contraseña===form.contraseña2)
    {
      handlerSubmit(evt)
    }
    else{
      setCheck(true);
      setTimeout(() => {
        setCheck(null);
      }, 4000);
    }
  }
  const handlerSubmit= async(evt) => {
    evt.preventDefault()
      crearCuenta(form)
      Swal.fire({
        icon: 'success',
        title: 'HAS CREADO LA CUENTA CORRECTAMENTE',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        
        })
      setTimeout(() => {
        navigate("/");
      }, 1500);
     
  }


  return (
<div className="image">
      <div className="container_formulario_logeo">
        <div className="title_formulario_logeo">
          <h1>Registro</h1>
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
            <b className="formulario__input-error">La contraseña tiene que tener una mayuscula, un numero, un simbolo y
                    entre 8 y 15 caracteres.</b>
            <div className="input_box">
              <input
              value={form.contraseña2}
              name="contraseña2"
              placeholder="repita tu contraseña"
              type="password"
              onChange={handleChange}
            />  
            </div>
            <div className="reg_btn">
              <input type="submit" value="Aceptar" />
            </div>
          </div>
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
        </form>
        
           <p className="cambio">
            ¿Ya posee una cuenta?<Link to="/logeo">Iniciar Secion</Link>
          </p>
       
      </div>
      
    </div>
  );
}

