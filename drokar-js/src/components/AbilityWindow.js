
import '../App.css'
import './AbilityWindow.css'
import AbilityClassWindow from './AbilityClassWindow';
import AbilityEquippedWindow from './AbilityEquippedWindow';
import { ABILITIES } from "../helpers/AbilityData";
import { PlayerDataContext } from '../helpers/Contexts';
import { useContext } from 'react';


function AbilityWindow(props) {
    const {playerData, setPlayerData, activeVocation, setActiveVocation} = useContext(PlayerDataContext)
    return (
        <div className="flexContainer">
            <div className="vocationList">
              {
                Object.keys(ABILITIES).map((vocation) => 
                {
                  return <AbilityClassWindow vocation={vocation}/>
                })
              }
      
            </div>

            <AbilityEquippedWindow playerData={playerData}/>


         </div>
    );
  }
  
  export default AbilityWindow;