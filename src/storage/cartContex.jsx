import { createContext,} from "react";
import { useState } from "react";
import useCopy from "../hooks/useCopy";
import Swal from "sweetalert2";

export const cartContext = createContext()

export function CartContextProvider(props) {
    const [cart,setCart]= useState(JSON.parse(localStorage.getItem("carrito"))||[])
    const newCart = useCopy(cart);
    function addItem(item){
            saveCartLocal([...cart,item])
            setCart([...cart,item])
            Swal.fire({
                title:'Se a añadido un producto al carrito',
                icon:'success',
                toast:true,
                position:'bottom-end',
                timer:1500,
                timerProgressBar:true,
                showConfirmButton: false,
                showCloseButton: true
              }
          
              )
        
    } 

    function removeItem(id){
        //remover item del carrito
        let carrito = cart.filter(item => item.id !== id);
        saveCartLocal(carrito)
        setCart(carrito)
        Swal.fire({
			title:'Eliminaste un item del carrito',
			icon:'error',
			toast:true,
			position:'bottom-end',
			timer:1500,
			timerProgressBar:true,
			showConfirmButton: false,
			showCloseButton: true,
			background:'red'
		  })
    
    }
    function clearCart(){

        setCart([])
        saveCartLocal([])

    }
    function getTotalItems(){
        let total=0
        cart.forEach((item) => total+=item.count)
        return total
    }

    function getTotalPrice(){
        let total=0
        cart.forEach((item) => {total+=item.count * item.precio})
        return total
    }
    function actulizarCantidad(id, count) {
        let index = cart.findIndex((item) => item.id === id);
        if((newCart[index].count<newCart[index].stock) && count === 1)
        {
            newCart[index].count += count;
        }
        if((newCart[index].count>1) && count === -1){
            newCart[index].count += count;
            
        }
        saveCartLocal(newCart)
            setCart(newCart)
      }


    function saveCartLocal (carrito){
        localStorage.setItem("carrito",JSON.stringify(carrito))
    }


    const value= {cart, addItem,getTotalItems,getTotalPrice,clearCart,removeItem,actulizarCantidad}
    return(
        <cartContext.Provider value={value}>
            {props.children}
        </cartContext.Provider>
    )
}