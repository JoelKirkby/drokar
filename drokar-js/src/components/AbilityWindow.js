
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
        <div className="abilityFlexContainer">
            <div className="vocationList">
              {
                Object.keys(ABILITIES).map((vocation) => 
                {
                  return <AbilityClassWindow vocation={vocation}/>
                })
              }
      
            </div>
          <div className="equippedContainer">
              {activeVocation ? <AbilityEquippedWindow playerData={playerData}/> : <p>No equipped Vocation</p>}
          </div>
         </div>
    );
  }
  
  export default AbilityWindow;