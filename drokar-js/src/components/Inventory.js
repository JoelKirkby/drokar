import '../App.css'
import InventoryItem from './InventoryItem';
import ItemInfoPanel from './ItemInfoPanel';
import { PlayerDataContext } from '../helpers/Contexts';
const toggleActiveItem = (itemName, activeItem, setActiveItem) => {
    if (activeItem != itemName) {
      setActiveItem(itemName)
    }
    else {setActiveItem('')}
  }

function Inventory() {
    const {playerData, setPlayerData} = useContext(PlayerDataContext)
    const [activeItem, setActiveItem] = useState('')
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
            {activeItem ? 
            <ItemInfoPanel 
              itemName={activeItem} 
              quantity={playerData['inventory'][activeItem].quantity}
              playerData={playerData}
              setPlayerData={setPlayerData} />
            : null
            }   
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