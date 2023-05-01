import { cartContext } from "../../storage/cartContex";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./cartContainer.css"



const CartContainer = () => {
  const { cart, getTotalPrice, removeItem, clearCart,actulizarCantidad} = useContext(cartContext);


  if (cart.length === 0) {
    return (
      <div>
        <h2 className="centro">No hay items en el carrito</h2>
      </div>
    );
  }
   
  return (
    <div className="carrito_contenedor" style={{marginTop:"8%"}}>
      <h1 className="titulo">carrito</h1>
      <table className="tabla_carrito">
		<thead>
			<tr>
				<th>Imagen</th>
				<th>Producto</th>
				<th>Precio</th>
				<th>Cantidad</th>
				<th>Remover</th>
        <th>Total</th>
			</tr>
		</thead>
		<tbody>
    {cart.map((item) => (
            <tr key={item.id} >
            <td>{item.titulo}</td>
            <td><img className="img-tomo_carro" height={50} src={item.imagen} alt={item.titulo} /></td>
            <td>${item.precio}</td>
            <td>
              <div className="product-quantity">
                <button className="quantity-button minus-button"  onClick={() => actulizarCantidad(item.id, -1)}>-</button>
                <div className="quantity">{item.count}</div>
                <button className="quantity-button plus-button" onClick={() => actulizarCantidad(item.id, 1)}>+</button>
              </div>
            </td>
            <td><button onClick={()=>removeItem(item.id)}>Eliminar</button></td>
            <td>$ {item.count*item.precio}</td>
          </tr>
          ))}
			
		</tbody>
		<tfoot className="pie">
			<tr>
				<th colSpan="5" style={{textAlign:"right"}}>Total:</th>
				<td>${getTotalPrice()}</td>
			</tr>
			<tr>
        <td colSpan="4"></td>
				<td  colSpan="1"><button onClick={clearCart}>Vaciar carrito</button></td>
				<td><Link to="/cart/checkout"><button>Realizar Compra</button></Link></td>
			</tr>
		</tfoot>
	</table>
    </div>
  );
};

export default CartContainer;
