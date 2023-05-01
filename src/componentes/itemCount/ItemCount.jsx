import React from "react";
import { ButtonChild } from "../button/Button";
import useCount from "../../hooks/useCount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./itemCount.css"


function ItemCount({handleAddToCart,cant}){
    const { count, handleAdd, handleSubstract } = useCount(cant);
    return(

            <div className="datoContador">
            <h3>Cantidad:</h3>
            <div className="contador">
                <ButtonChild onClick={handleSubstract}>-</ButtonChild>
                <h2>{count}</h2>
                <ButtonChild onClick={handleAdd}>+</ButtonChild>
            </div>
            <div className="contenedorBoton">
            
                <button className="agregar"  onClick={()=>handleAddToCart(count)}><FontAwesomeIcon className="icono_carro" icon={faPlus} />Añadir al carrito</button>
                
            </div>
            
            </div> 
            
    )
}
export default ItemCount