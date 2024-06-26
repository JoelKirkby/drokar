import { ItemData } from "../helpers/ItemData";

function InventoryItem({itemName, quantity}) {
    return (
      <div className="inventoryItem">
        <div className="inventoryImgContainer"> 
          <img src={ItemData[itemName].image} className='inventoryGridImg' alt="inventoryitem"/>
        </div>
        <div className="inventoryItemQuantity">{quantity}</div>
      </div>
    );
  }
  
  export default InventoryItem;