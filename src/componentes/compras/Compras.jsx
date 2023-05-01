import React, { useState } from "react";
import { getCompra } from "../../service/cartFirebase";
import CompraContainer from "../compraContainer/CompraContainer";

function Compras() {
  const [idCompra, setIdCompra] = useState("");
  const [compra, setCompra] = useState();

  const handleChange = (e) => {
    setIdCompra(e.target.value);
  };

  function hendleSubmit(evt) {
    evt.preventDefault();
    getCompra(idCompra).then((respuesta) => {
      setCompra(respuesta);
    });
  }

  if (compra) return <CompraContainer compra={compra} />;

  return (
    <div className="image">
      <div className="container_formulario_logeo">
        <form onSubmit={hendleSubmit} className="formulario">
        <div className="title_formulario_logeo">
          <h1>Buscador de orden </h1>
        </div>
          <div className="input_box">
            <input
              type="text"
              name="id"
              value={idCompra}
              onChange={handleChange}
            />
          </div>
          <div className="reg_btn">
            <input type="submit" value="enviar" />
          </div>
        </form>
      </div>
    </div>
  );
}
export default Compras;
