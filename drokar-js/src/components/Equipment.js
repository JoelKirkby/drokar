import { ItemData } from "../helpers/ItemData";
import './Equipment.css';

// Item information panel which shows the item, description, sell value, and slider to sell
// TODO = Acquired and used by section, it's own tab?
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
        <div className="blank4 blank"></div>
        {EquipSlot("feet", playerData, setPlayerData)}
      </div>
    );
  }
  
  export default Equipment;