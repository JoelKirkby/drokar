
import '../App.css'
import { PlayerDataContext } from '../helpers/Contexts';
import { useContext } from 'react';
import Inventory from './Inventory';
import ItemInfoPanel from './ItemInfoPanel';
import { ABILITIES } from '../helpers/AbilityData';
import { useState } from 'react';
import AbilityRow from './AbilityRow';

import './AbilityWindow.css'

function AbilityWindow(props) {
    const {activeTask, setActivetask, playerData} = useContext(PlayerDataContext)
    const [activeVocation, setActiveVocation] = useState('')
    return (
        <div className="flexContainer">
            <div className="vocationList">
              vocationList
              {Object.keys(ABILITIES).map(function(name, i) {
                return <div className="vocationBox" onClick={(e) => setActiveVocation(name)}>
                    <img src={ABILITIES.name.img} alt={`${name} icon`}/>
                    {name} - Level {playerData.skills[name]}
                    </div>
                })}    
            </div>
            <div className="skillSelection">
              skillSelection
              <div className="equippedSkills">
                <AbilityRow data={playerData.activeVocation}/>
              </div>
              <div className="availableSkills">
                {activeVocation 
                ? <AbilityRow data={ABILITIES[activeVocation]}/>
                : null}
                Available skills
              </div>

            </div>
      </div>
    );
  }
  
  export default AbilityWindow;