
import React, { useState, useEffect } from "react";
import { existencia} from "../../service/cartFirebase";
import Loader from "../loader/Loader";
import ItemList from "../itemList/ItemList";
import Carrusel from "../carrusel/carrusel"
import Carrusel2 from "../carrusel2/Carrusel2"
export default function Inicio() {
  const [descuento,setDescuento] = useState([])
  const [mas,setMas] = useState([])
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  async function getProducts(){
    try{
        let respuesta = await existencia("descuento")
        setDescuento(respuesta)
        let res = await existencia("mas")
        setMas(res)
    }catch(err){
        console.error(err);
    }finally{
        setIsLoading(false);
      }
   
  }
  getProducts()
}, []);


 if(isLoading){
    return(<Loader />)
 }
  return (
    <div>
      <Carrusel2/>
        
        <div className="productos">
        <h1 className="titulo_index">Descuentos</h1>
    <ItemList products={descuento} />
      </div>
      <div>
        <Carrusel/>
      </div>
      <div className="productos">
      <h1 className="titulo_index">mas vendidos</h1>
      <ItemList products={mas} />
    </div>
    </div>
    
  )
}

