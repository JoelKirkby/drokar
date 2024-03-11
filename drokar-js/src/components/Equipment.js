import { ItemData } from "../helpers/ItemData";
import './Equipment.css';

// Item information panel which shows the item, description, sell value, and slider to sell
// TODO = Acquired and used by section, it's own tab?
function Equipment({playerData, setPlayerData}) {
    return (
      <div className="grid-container">
        <div className="blank1 blank"></div>
        <div className="helmet">{playerData.equipped.helmet}</div>
        <div className="blank2 blank"></div>
        <div className="weapon">{playerData.equipped.weapon}</div>
        <div className="chest">{playerData.equipped.chest}</div>
        <div className="shield">{playerData.equipped.offHand}</div>
        <div className="blank3 blank"></div>
        <div className="leg">{playerData.equipped.leg}</div>
        <div className="blank4 blank"></div>
        <div className="feet">{playerData.equipped.feet}</div>
      </div>
    );
  }
  
  export default Equipment;