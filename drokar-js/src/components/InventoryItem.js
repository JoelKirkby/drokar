import { ItemData } from "../helpers/ItemData";

function InventoryItem({item, quantity}) {
    return (
      <div className="inventoryItem">
        <img src={ItemData[item].image} className='inventoryGridImg'/>
        <div className="inventoryItemQuantity">{quantity}</div>
      </div>
    );
  }
  
  export default InventoryItem;