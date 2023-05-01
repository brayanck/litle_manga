import { createContext} from "react";
import { useState } from "react";
import Swal from "sweetalert2";

export const favoriteContext = createContext()

export function FavoriteContextProvider(props){

    const [favoritos,setFavoritos]= useState(JSON.parse(localStorage.getItem("favoritos"))||[])
    function saveFavoLocal (fav){
        localStorage.setItem("favoritos",JSON.stringify(fav))
    }
    function añadirFavoritos(producto){
        saveFavoLocal([...favoritos,producto])
            setFavoritos([...favoritos,producto])
            Swal.fire({
                title:'Se a añadido el producto a favoritos',
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
      function clearFavoritos(){

        setFavoritos([])
        saveFavoLocal([])

    }
      function eliminarFavorito(id){
        let fav = favoritos.filter(item => item.id !== id);
        saveFavoLocal(fav)
        setFavoritos(fav)
        Swal.fire({
			title:'Eliminaste el producto de favoritos',
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

    const value= { favoritos,saveFavoLocal,añadirFavoritos,eliminarFavorito,clearFavoritos}
    return(
        <favoriteContext.Provider value={value}>
            {props.children}
        </favoriteContext.Provider>
    )
}