import { useState, useEffect } from "react";
import { userContext } from "../../storage/userContex";
import { useContext } from "react";
import { createBuyOrder } from "../../service/cartFirebase";
import { cartContext } from "../../storage/cartContex";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import "./checkout.css";

const expresiones = {
  telefono: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
};
const initialForm = {
  nombre: "",
  apellido: "",
  direccion: "",
  telefono: "",
  altura: "",
  codigo: "",
  provincia: "",
  municipio: "",
  localidad: "",
  observacion: "",
};
export default function Checkout() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [check, setCheck] = useState(null);
  const { usuario} = useContext(userContext);
  const { cart, getTotalPrice, clearCart } = useContext(cartContext);
  const [municipio, setMunicipio] = useState([]);
  const [ubicacion, setUbicacion] = useState([]);
  const [localidad, setLocalidad] = useState([]);
  const provincia = async () => {
    try {
      let res = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
      const data = await res.json();
      setUbicacion(data.provincias);
    } catch (err) {
      console.log(err);
    }
  };
  const munici = async () => {
    if(form.provincia){
      try {
      let res = await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${form.provincia}`);
      const data = await res.json();
      
      setMunicipio(data.municipios);
    } catch (err) {
      console.log(err);
    }
    }
    
  };
  const locali = async () => {
    if(form.municipio){
      try {
      let res = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?municipio=${form.municipio}`);
      const data = await res.json();
  
      setLocalidad(data.localidades);
    } catch (err) {
      console.log(err);
    }
    }
    
  };
  useEffect(()=>{
    provincia()
    munici()
    locali()
    
    
  },[form])
  
  const revicion = async (evt) => {
    evt.preventDefault();

    if (
      expresiones.nombre.test(form.nombre) &&
      expresiones.nombre.test(form.apellido) &&
      expresiones.telefono.test(form.telefono) &&
      form.direccion &&
      form.codigo &&
      form.altura&&
      form.provincia&&
      usuario&&
      cart.length > 0
    ) {
      handleCheckout(evt);
    } else {
      setCheck(true);
      setTimeout(() => {
        setCheck(null);
      }, 5000);
    }
  };
  async function handleCheckout(evt) {
    evt.preventDefault();
    const items = cart.map((product) => ({
      id: product.id,
      titulo: product.titulo,
      precio: product.precio,
      count: product.count,
    }));
    form.email = usuario.email;
    const order = {
      buyer: form,
      order: items,
      date: new Date(),
      total: getTotalPrice(),
    };
    let id = await createBuyOrder(order);

    Swal.fire(
      "success",
      `relizaste la compra correctamente tu numero de compra es ${id}`,
      "success"
    ).then((Response) => {
      setTimeout(() => {
        navigate("/");
        clearCart();
      }, 1000);
    });
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="image">
        <div className="container_formulario_compra">
          <div className="title_formulario_compra">
            <h1> Ya casi finaliza tu compra!</h1>

            <h4> Llena este formulario con tus datos para terminar</h4>
          </div>
          <form onSubmit={revicion}>
            <div className="user_details">
              <div className="title3_formulario_compra">
                <h3> Datos personales</h3>
              </div>
              <div className="input_box_form">
                <input
                  placeholder="Nombre"
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input_box_form">
                <input
                  placeholder="Apellido"
                  type="text"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input_box_form">
                <input
                  placeholder="Numero de telefono"
                  type="text"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              {
                (usuario)?
                <div className="input_box_form">
                <input
                  placeholder="email"
                  type="text"
                  name="email"
                  value={usuario.email}
                  
                />
              </div>:
              <div className="input_box_form">
              <input
                placeholder="email"
                type="text"
                name="email"
                value=""
              />
            </div>
              }
              

              <div className="title3_formulario_compra">
                <h3> Detalles de envio</h3>
              </div>
              <div className="input_box_form">
                <input
                  placeholder="Calle"
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input_box_form">
                <input
                  placeholder="Altura"
                  type="text"
                  name="altura"
                  value={form.altura}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input_box_form">
                <input
                  placeholder="Codigo Postal"
                  type="text"
                  name="codigo"
                  value={form.codigo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input_box_form">
              <select
                  className="seleccionar"
                  name="provincia"
                  id="provincia"
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    Elige tu provincia
                  </option>
                  {ubicacion.map((item) => (
                    <option key={item.nombre} value={item.nombre}>{item.nombre}</option>
                  ))} 

                </select>
              </div>
              
              <div className="input_box_form">
              <select
                  className="seleccionar"
                  name="municipio"
                  id="municipio"
                  onChange={handleChange}
                >
                  <option value="Muncipio" selected disabled>
                    Elige Muncipio
                  </option>
                  {
                    (form.provincia)&&
                    municipio.map((item) => (
                    <option key={item.nombre} value={item.nombre}>{item.nombre}</option>
                  ))
                  }
                  

                </select>
              </div>
              <div className="input_box_form">
              <select
                  className="seleccionar"
                  name="localidad"
                  id="localidad"
                  onChange={handleChange}
                >
                  <option value="localidad" selected disabled>
                    Elige tu localidad
                  </option>
                  {
                    (form.municipio)&&
                    localidad.map((item) => (
                    <option key={item.nombre} value={item.nombre}>{item.nombre}</option>
                  ))
                  }
                  

                </select>
              </div>
              

              <div className="input_box_obs">
                <textarea
                  name="observacion"
                  value={form.observacion}
                  onChange={handleChange}
                  type="text"
                  id="obs"
                  placeholder=" Observacion"
                ></textarea>
              </div>
            </div>

            <div className="reg_btn">
              <input type="submit" value="Aceptar" />
            </div>
          </form>
          <div
            className={
              (!usuario)?
              "formulario__mensaje_activo"
                :"formulario__mensaje" 
            }
          >
            <p>
              <FontAwesomeIcon
                className="icono_carro"
                icon={faTriangleExclamation}
              />
              <b>Error:</b> Por favor recuerda tener la sesion iniciada.
            </p>
          </div>
          <div
            className={
              check == null
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
        </div>
      </div>
    </>
  );
}
