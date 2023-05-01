import React, { useState,useEffect,useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar} from "@fortawesome/free-solid-svg-icons";
import { favoriteContext } from "../../storage/favoriteContex";


function ToggleButton(props) {
  const [isActive, setIsActive] = useState(false);

  const {añadirFavoritos,eliminarFavorito,favoritos} = useContext(favoriteContext);


  const handleClick = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    setIsActive(!isActive);
    if(!isActive){
      añadirFavoritos(props.props)
    }
    else{
      eliminarFavorito(props.props.id)
    }
    }
    useEffect(()=>{
      let fav = favoritos.find(item => item.id === props.props.id);
      if(fav){
        setIsActive(true)
      }
    },[props,favoritos])
  

  let classToggleBtn;
  if (isActive) classToggleBtn = "fav-button fav-button_active";
  else classToggleBtn = "fav-button";

  return (
    
         <FontAwesomeIcon onClick={handleClick} className={classToggleBtn} icon={faStar} />
  
   
  );
}

export default ToggleButton;
