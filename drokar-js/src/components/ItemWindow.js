import '../App.css'
import { PlayerDataContext } from '../helpers/Contexts';
import { useContext } from 'react';
import Inventory from './Inventory';
import Equipment from './Equipment';
import CombatDetails from './CombatDetails';

function ItemWindow(props) {
    const {playerData, setPlayerData} = useContext(PlayerDataContext)
    return (
        <div className="flexContainer">
            <Inventory/>
            <Equipment playerData={playerData} setPlayerData={setPlayerData}/>
            <CombatDetails combatData={playerData.combatStats} name={playerData.name}/>
      </div>
    );
  }
  
  export default ItemWindow;