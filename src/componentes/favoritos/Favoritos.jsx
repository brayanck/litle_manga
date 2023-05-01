import { useContext } from "react";
import { favoriteContext } from "../../storage/favoriteContex";
import Item from "../item/Item";


function Favoritos(){
    const {favoritos} = useContext(favoriteContext);
    if (favoritos.length === 0) {
    return (
      <div>
        <h2 className="centro">No hay items en favoritos</h2>
      </div>
    );
  }
return(
    <div className="productos">
        <h1 className="titulo_index">Mis favoritos</h1>
        <div className="productos__center">
            {favoritos.map((item) => (
            <Item
            key={item.id}
            {...item}
            />
          ))}
        </div>
        
    </div>
)
}
export default Favoritos;