
import '../App.css'
import { PlayerDataContext } from '../helpers/Contexts';
import { useContext } from 'react';
import AbilityRow from './AbilityRow';
import { ABILITIES } from '../helpers/AbilityData';
import { useState } from 'react';


import './AbilityWindow.css';

function AbilityWindow(props) {
    const {activeTask, setActivetask, playerData, activeVocation, setActiveVocation} = useContext(PlayerDataContext)
    console.log(`playerData.activeVocation: ${playerData.activeVocation}`)
    return (
        <div className="flexContainer">
            <div className="vocationList">
              vocationList
              {Object.keys(ABILITIES).map(function(ability, i) {
                return <div className="vocationBox" onClick={(e) => setActiveVocation(ability.name)}>
                    <img src={ability.img} alt={`${ability.name} icon`}/>
                    {ability.name} - Level {playerData.skills[ability.name]}
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
                ? <AbilityRow data={activeVocation}/>
                : null}
                Available skills
              </div>

            </div>
      </div>
    );
  }
  
  export default AbilityWindow;