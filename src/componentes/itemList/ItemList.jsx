import Item from "../item/Item";

function ItemList(props) {
  return (
    <div>
      
        <div className="productos__center">
          {props.products.map((item) => (
            <Item
            key={item.id}
            {...item}
            />
          ))}
        </div>
      
    </div>
  );
}

export default ItemList;
