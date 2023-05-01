import ItemList from "../itemList/ItemList";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import { getItem, getItemsByCategory} from "../../service/cartFirebase";

function ElementoDeLista() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  getItemsByCategory()

  const { idCategory } = useParams();

useEffect(() => {
  async function getProducts(){
    if(!idCategory)
    {
      try{
        let response = await getItem();
        setProducts(response)
      } catch(error){
        Error("no se han encontrado los producto")
      } finally{
        setIsLoading(false);
      }
    }
    else{
      let response = await getItemsByCategory(idCategory);
      setProducts(response)
      setIsLoading(false);
    }
  }
  getProducts()
}, [idCategory]);


  let titulo;
  if (idCategory === undefined) {
    titulo = "Productos";
  } else {
    titulo = idCategory;
  }
  if(isLoading){
    return (<Loader />)
  }
 
  return (
    <div>
      <div className="productos">
        <h1 className="titulo_index">{titulo}</h1>
         <ItemList products={products} />
      </div>
    </div>
  );
}

export default ElementoDeLista;
