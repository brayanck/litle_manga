
import { Link } from "react-router-dom";
import { ButtonChild } from "../button/Button";
import ToggleButton from "../toggleButon/ToggleButon";
import { cartContext } from "../../storage/cartContex";
import { useContext,useEffect,useState  } from "react";
import {userContext} from "../../storage/userContex"
import "./item.css"

function Item(props) {
  const [isInCart,setIsInCart]= useState(false)
  const {cart} = useContext(cartContext);
  const {usuario} = useContext(userContext)
  const urlDetail = `/item/${props.id}`;
  useEffect(()=>{
    let carrito = cart.find(item => item.id === props.id);
    if(carrito){
      setIsInCart(true)
    }
  },[cart,props])
  
  
  return (
    <>
      <div className="card">
        <div className="image__container">
          <img src={props.imagen} alt={props.titulo}></img>
        </div>
        <div className="producto__footer">
          <h3 className="titulo">{props.titulo}</h3> 
          
          {props.descuento ? (
            <div>
              <div>
                <del className="price" style={{color:"#999"}}>$ {props.precio+(props.precio*props.descuento/100)}</del>
              </div>
              <div style={{color:"green"}} className="price">-{props.descuento}%: $ {props.precio}</div>
            </div>
            
          ):<div className="price">$ {props.precio}</div>}
        </div>
        <div className="bottom">
          {
            !isInCart?
            <Link to={urlDetail}>
            <div className="btn__group">
              <ButtonChild>ver producto</ButtonChild>
            </div>
          </Link>
          :
          <div className="btn__group">
              <button className="deshabilitado">deshabilitado</button>
            </div>
          }
          { 
          (usuario)&&<ToggleButton props={props} />
        }
        </div>
      </div>
    </>
  );
}

export default Item;
