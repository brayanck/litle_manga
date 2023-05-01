import "./App.css";
import NavBar from "./componentes/navBar2/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartContextProvider } from "./storage/cartContex";
import { UserContexProvider } from "./storage/userContex";
import ItemDetailContainer from "./componentes/itemDetailContainer/ItemDetailContiner"
import CartContainer from "./componentes/cartContainer/CartContainer"
import { FavoriteContextProvider } from "./storage/favoriteContex";
import Home from "./pages/Home";
import Checkout from "./componentes/checkout/Checkout";
import Inicio from "./componentes/inicio/Inicio";
import Logeo from "./componentes/login2/Login2";
import Registro from "./componentes/Registro/Registro";
import ItemListContainer from "./componentes/itemListContainer/ItemListContainer"
import Favoritos from "./componentes/favoritos/Favoritos";
import Compras from "./componentes/compras/Compras";
import Footer from "./componentes/footer/Footer";
import NotFoundPage from "./pages/NotFoundPage";

// import {exportDatawithBatch} from "./service/cartFirebase"




function App() {

  return (
    <>
      <UserContexProvider>
        <CartContextProvider>
          <FavoriteContextProvider>
            <BrowserRouter>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/catalogo" element={<ItemListContainer/>}></Route>
                <Route path="/cart" element={<CartContainer />}></Route>
                <Route
                  path="/item/:itemid"
                  element={<ItemDetailContainer />}
                ></Route> 
                <Route
                  path="/cart/checkout"
                  element={<Checkout />}
                ></Route> 
                <Route
                  path="/inicio"
                  element={<Inicio />}
                ></Route> 
                <Route
                  path="/logeo"
                  element={<Logeo />}
                ></Route> 
                <Route
                  path="/registro"
                  element={<Registro />}
                ></Route> 
                <Route
                  path="/Favoritos"
                  element={<Favoritos/>}
                ></Route> 
                <Route
                  path="/misCompras"
                  element={<Compras/>}
                ></Route> 
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              
              
               <Footer/>
            </BrowserRouter>
            {/* <button onClick={()=>exportDatawithBatch()}>rwrwrw</button> */}
          </FavoriteContextProvider>
        </CartContextProvider>
      </UserContexProvider>
    </>
  );
}

export default App;
