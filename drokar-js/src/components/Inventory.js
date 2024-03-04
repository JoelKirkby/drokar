import '../App.css'
import InventoryItem from './InventoryItem';
import { PlayerDataContext } from '../helpers/Contexts';
import { useContext } from 'react';

function Inventory() {
    const {playerData, setPlayerData} = useContext(PlayerDataContext)
    var inventory_items = playerData.inventory
    
    return (
      <div className="Inventory">
        Inventory
        <div className="inventoryActionButtons">
            <button className="sellButton"> Sell </button>
        </div>
        <div className="tabsGold">
            <div className="tabs">
                Tabs
            </div>
            <div className="currency">
                0gp
            </div>
        </div>
        <div className="itemZone">
            <div className="inventoryGrid">
                {Object.keys(inventory_items).map(function(itemName, i) {
                    return inventory_items[itemName].quantity > 0 
                    ? <InventoryItem  itemName={itemName} attr={inventory_items[itemName]}/>
                    : null
                }         
                )}
            </div>
            <div className="equippedWindow">EquippedWindow</div>
        </div>
      </div>
    );
  }
  
  export default Inventory;