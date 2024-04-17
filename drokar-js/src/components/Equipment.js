import { ItemData } from "../helpers/ItemData";
import './Equipment.css';
// Item information panel which shows the item, description, sell value, and slider to sell
// TODO = Acquired and used by section, it's own tab?

const unequipItem = (itemSlot, playerData, setPlayerData) => {
  // TODO - Hardcode to only equip 1 of the items for now - will go back for equipping things with stack size eg. arrows
  let newPlayerData = {...playerData}

  // Place back in equipped items
  var equippedItem = newPlayerData.equipped[itemSlot]
  equippedItem in newPlayerData.inventory 
    ? newPlayerData.inventory[equippedItem].quantity += 1
    : newPlayerData.inventory[equippedItem] = {"quantity": 1}
  
  // Remove combat stats
  if (ItemData[equippedItem].combatStats) {
    for (const [stat, value] of Object.entries(ItemData[equippedItem].combatStats)) {
      if (stat == "attackSpeed") {
        newPlayerData.combatStats[stat] = 2000
      } else {
        newPlayerData.combatStats[stat] -= value
      }
    }
  }
  
  // Clear item slot
  newPlayerData.equipped[itemSlot] = ''
  setPlayerData(newPlayerData)
}

function EquipSlot(slot, playerData, setPlayerData) {

  return (
    <div className={slot}>
    {playerData.equipped[slot] 
    ? <img className='equipmentImg' onDoubleClick={(e) => {unequipItem(slot, playerData, setPlayerData)}} src={ItemData[playerData.equipped[slot]].image}></img>
    : ''
    }
    </div>
  );
}

function Equipment({playerData, setPlayerData}) {

    return (
      <div className="grid-container">
        <div className="blank1 blank"></div>
        {EquipSlot("helmet", playerData, setPlayerData)}
        <div className="blank2 blank"></div>
        {EquipSlot("weapon", playerData, setPlayerData)}
        {EquipSlot("body", playerData, setPlayerData)}
        {EquipSlot("offHand", playerData, setPlayerData)}
        <div className="blank3 blank"></div>
        {EquipSlot("leg", playerData, setPlayerData)}
        <div className="blank4 blank"><a className='equipmentTip'>Double click slot <br/> to  unequip item </a> </div>
        {EquipSlot("feet", playerData, setPlayerData)}
      </div>
    );
  }
  
  export default Equipment;