import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { cartContext } from "../../storage/cartContex";
import { Link } from "react-router-dom";
import "./carrito.css"
 
function Carrito() {
  const { getTotalItems } = useContext(cartContext);

; 
let cantidad = getTotalItems()
  return (
    <Link to="/cart">
      <div className="carrito__icon">
        <FontAwesomeIcon className="icono_carro" icon={faCartShopping} />
        {
          (cantidad !== 0)&&<p className="item__total">{cantidad}</p>
        }
        
        
      </div>
    </Link>
  );
}

export default Carrito;