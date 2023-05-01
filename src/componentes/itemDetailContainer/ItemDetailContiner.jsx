import { getSingleItem } from "../../service/cartFirebase";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemCount from "../itemCount/ItemCount";
import { cartContext } from "../../storage/cartContex";
import { useContext } from "react";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import "./itemDetailContainer.css"




const ItemDetailContainer2 = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInCart, setIsInCart] = useState(false);
  let { itemid } = useParams();
  const { cart, addItem } = useContext(cartContext);

  const itemInCart = cart.find((item) => item.id === product.id);
  let stockAct;
  if (itemInCart) {
    stockAct = product.stock - itemInCart.count;
  } else {
    stockAct = product.stock;
  }

  function handleAddToCart(count) {
    setIsInCart(true);
    product.count = count;
    addItem(product);
  }

  useEffect(() => {
    getSingleItem(itemid).then((respuesta) => {
      
      setProduct(respuesta);
      setIsLoading(false);
    });
  }, [itemid]);

  if (isLoading) {
    return <Loader />;
  } 

  return (
    <div className="container_description">
        <div className="container-title"> <h2>{product.titulo}</h2></div>
        <div className="container-image">
         
           <img src={product.imagen} 
           alt={product.imagen} className="imagen_producto"/>
           <div className="buttons">
            <div className="container-info-product">
            <div className="container-price">
                <span>${product.precio}</span>
                <div className="icon-price">
                <i className="fa-solid fa-chevron-right"></i>
            </div>
            
            </div>
            {!isInCart ? (
              <div>
                <ItemCount cant={stockAct} handleAddToCart={handleAddToCart} />
                <Link to="/cart/checkout">
                   <button onClick={()=>handleAddToCart(1)} className="submit-buy">
                Comprar
                 </button>
                </Link>
               
              </div>
              
              
            ) : (
              <div>
                <h3 className="container-title">El producto ya esta en el carrito</h3>
                <Link to="/cart">
                <button className="btn">Ir al carrito</button>
              </Link>
              </div>
              
            )}
        </div>
        
         </div>
          
            
           
         
         </div>
         <div className="container-description">
            <div className="title-description">
                <h4>Descripcion</h4>
            </div>
            <div className="text-description">
                <p>{product.descripcion}</p>
            </div>
            </div>
            <div className="container-ad-information">
            <div className="title-ad-information">
                <h4>
                    Informacion Adicional
                </h4>
            </div>
              <div className="text-ad-info">
                <p><span>Autor:</span> {product.autor}</p>
                <p><span>Categoria:</span> {product.categoria}</p>
              </div>
        </div>
            
        

        
    </div>
    
  );
};

export default ItemDetailContainer2;
