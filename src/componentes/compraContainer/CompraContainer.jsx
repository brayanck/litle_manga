import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ButtonChild } from "../button/Button";

function CompraContainer(props){
  const [itemsTotales, setItemsTotales]= useState()
  useEffect(()=>{
    let total=0
    props.compra.order.forEach((item) => total+=item.count)
    setItemsTotales(total)
  },[props])
return(
    <div className="carrito_contenedor" style={{marginTop:"8%"}}>
        <h1 className="titulo">Compra de {props.compra.buyer.nombre} {props.compra.buyer.apellido}</h1>
        <table className="tabla_carrito">
        <thead className="">
          <tr className="">
            <th>Cantidad</th>
            <th>Producto</th>
            <th>Precio</th>
            
          </tr>
        </thead>
        <tbody> 
          {props.compra.order.map((item) => (
            <tr key={item.id}>
              <td>{item.count}</td>
              <td>{item.titulo}</td>
              <td>$ {item.precio}</td>
            </tr>
            
          ))}

        </tbody>
        <tfoot className="pie">
			<tr>
        <td>{itemsTotales}</td>
				<th colSpan="4" style={{textAlign:"right"}}>Total:</th>
				<td>${props.compra.total}</td>
			</tr>
		</tfoot>
        
      </table>
      <div className="centro2">
        <Link to="/">
            <ButtonChild>Ir a inicio</ButtonChild>
        </Link>
      </div>
      
    </div>
)
}
export default CompraContainer;