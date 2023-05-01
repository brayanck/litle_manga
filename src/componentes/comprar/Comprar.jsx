import { useState } from "react";
import { userContext } from "../../storage/userContex";
import { useContext } from "react";
import { createBuyOrder } from "../../service/cartFirebase";
import { cartContext } from "../../storage/cartContex";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import"./comprar.css"

const expresiones = {
  telefono: /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/,
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
};
const initialForm = {
  nombre: "",
  apellido: "",
  direccion: "",
  telefono: "",
  email: "",
  calle: "",
  altura: "",
  codigo: "",
  municipio: "",
  observacion: "",
};
export default function Comprar() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const { usuario } = useContext(userContext);
  const { cart, getTotalPrice, clearCart } = useContext(cartContext);
  const [check, setCheck] = useState(null);

  const revicion = async (evt) => {
    evt.preventDefault();

    if (
      expresiones.nombre.test(form.nombre) &&
      expresiones.nombre.test(form.apellido) &&
      expresiones.telefono.test(form.telefono) &&
      form.direccion.length > 4 &&
      usuario !== null &&
      cart.length > 0
    ) {
      handleCheckout(evt);
    } else {
      setCheck(false);
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
        <div className="container">
          <div className="title">
            <h1> Ya casi finaliza tu compra!</h1>

            <h4> Llena este formulario con tus datos para terminar</h4>
          </div>
          <form onSubmit={revicion}>
            <div className="user_details">
                <div className="title3">
                    <h3> Datos personales</h3>
                </div>
                <div className="input_box">
                    <input placeholder="Nombre" type="text" name="nombre" value={form.nombre} onChange={handleChange}required autofocus/>
                </div>
                <div className="input_box">
                    <input placeholder="Apellido" type="text" name="apellido" value={form.apellido} onChange={handleChange} required/>
                </div>
                <div className="input_box">
                    <input placeholder="Numero de telefono" type="text" name="telefono" value={form.telefono} onChange={handleChange} required/>
                </div>
                <div className="input_box">
                    <input type="email" id="email" placeholder=" Email" required/>
                </div>
              
                <div className="title3">
                   
                    <h3> Detalles de envio</h3>
                   
                </div>
                <div className="input_box">
                    <input placeholder="Calle" type="text" name="direccion" value={form.direccion} onChange={handleChange} required />
                </div>
                <div className="input_box">
                    <input placeholder="Altura" type="text" name="altura" value={form.altura} onChange={handleChange} required/>
                </div>
                <div className="input_box">
                    <input type="text" id="city" placeholder=" Municipio/Ciudad" required/>
                </div>
                <div className="input_box">
                    <input placeholder="Codigo Postal" type="text" name="codigo" value={form.codigo} onChange={handleChange} required/>
                </div>
                <div className="input_box_obs">
               
                        <textarea name="observacion" value={form.observacion} onChange={handleChange} type="text" id="obs" placeholder=" Observacion"></textarea>
                </div>
            </div>
        
            <div className="reg_btn">
                <input type="submit" value="Aceptar"/>
            </div>
        </form>
        </div>
      </div>
    </>
  );
}
