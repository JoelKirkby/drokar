import '../App.css'
import InventoryItem from './InventoryItem';
import ItemInfoPanel from './ItemInfoPanel';
import Equipment from './Equipment';
import { PlayerDataContext } from '../helpers/Contexts';
import { useContext, useState} from 'react';
import { Button } from '@mui/material';

const toggleActiveItem = (itemName, activeItem, setActiveItem) => {
    if (activeItem != itemName) {
      setActiveItem(itemName)
    }
    else {setActiveItem('')}
  }

const toggleEquipment = (showEquipment, setShowEquipment) => {
    setShowEquipment(!showEquipment)
    }

function Inventory() {
    const {playerData, setPlayerData} = useContext(PlayerDataContext)
    const [activeItem, setActiveItem] = useState('')
    const [showEquipment, setShowEquipment] = useState(false)
    const [activeMonster, setActiveMonster] = useState({})
    var inventory_items = playerData.inventory
    return (
      <div className="Inventory">
        Inventory
        <div className="inventoryActionButtons">
            <Button sx={{fontSize: "10px", fontWeight: "bold"}} variant="contained" className="sellButton" onClick={(e) => setShowEquipment(!showEquipment)}> Toggle Equipment </Button>
        </div>
        <div className="tabsGold">
            {/* <div className="tabs">
                Tabs
            </div> */}
            <div className="currency">
                {playerData.gold} gp
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
                    ?  <div onClick={() => toggleActiveItem(itemName, activeItem, setActiveItem)}>
                        <InventoryItem  
                        itemName={itemName} 
                        quantity={inventory_items[itemName].quantity} />
                        </div>
                    : null
                }         
                )}
            </div>
            
        </div>
        {showEquipment ? <Equipment playerData={playerData} setPlayerData={setPlayerData}/> : null}
      </div>
    );
  }
  
  export default Inventory;