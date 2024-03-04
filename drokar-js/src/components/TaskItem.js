import { ItemData } from "../helpers/ItemData";

function TaskItem({item, quantity}) {
    return (
      <div className="inventoryItem">
        <div className="inventoryImgContainer"> 
          <img src={ItemData[item].image} className='inventoryGridImg' alt="inventoryitem"/>
        </div>
        <div className="inventoryItemQuantity">{quantity}</div>
      </div>
    );
  }
  
  export default TaskItem;