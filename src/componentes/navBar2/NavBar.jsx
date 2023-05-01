import React, { useEffect,useState } from "react";
import Carrito from "../carrito/Carrito";
import { Link, useLocation } from "react-router-dom";
import { userContext } from "../../storage/userContex";
import { useContext } from "react";
import { favoriteContext } from "../../storage/favoriteContex";
import { useNavigate } from "react-router-dom";
import "./navBar.css"
import logo2 from "../../assets/logo2.png"

function NavBar2() {
  const navigate = useNavigate();
  const { usuario,autenti, cerrarSesion} = useContext(userContext);
  const {clearFavoritos} = useContext(favoriteContext)
  const [isChecked, setIsChecked] = useState(false);
  const location = useLocation();

  useEffect(()=>{ 
    autenti()
    setIsChecked(false);
    window.scrollTo(0,0)

  },[location.pathname,autenti])
  
  const handleChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <header className="navegador">
        <input onChange={handleChange} checked={isChecked} type="checkbox" id="btn-menu"/>
    <label for="btn-menu" value="" className="lbl-menu">
        <span id="spn1"></span>
        <span id="spn2"></span>
        <span id="spn3"></span>
    </label>
        
    <Link className="enlace" to="/"><img src={logo2} alt="logo" className="logo"/></Link>
      <Carrito/>
        <ul>   
        <li>
          <Link to="/catalogo">productos</Link></li>
        
        {
          (usuario)&&
            <li>
          <Link to="/Favoritos">Mis Favoritos</Link>
        </li>
        }
        {
          (usuario)&&
            <li>
          <Link to="/misCompras">Mis compras</Link>
        </li>
        }
 
        
        {
          (usuario)?
          <li>
            <button className="logout" onClick={()=>{cerrarSesion() ; clearFavoritos();navigate("/")}}>Cerrar Sesión</button>
          </li>
        :
        <li>
          <Link  className="hipervinculo"to="/logeo">
          Inicio de Sesión
        </Link>
        </li>
        
        }
        <li>
          <label htmlFor="" style={{color:"rgb(36, 26, 21)"}}>Usuario: {(usuario)&&usuario.email} </label>
        </li>
        

        </ul>
    </header>
  );
}

export default NavBar2;
