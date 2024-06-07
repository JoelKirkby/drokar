
import '../App.css'
import './AbilityWindow.css'
import { PlayerDataContext } from '../helpers/Contexts';
import { useContext } from 'react';
import AbilityRow from './AbilityRow';
import { ABILITIES } from '../helpers/AbilityData';
import { useState } from 'react';
import { LinearProgress } from "@mui/material";
import { Button } from '@mui/material';
import { calculateLevels } from '../functions/calcs';


import './AbilityWindow.css';

const descriptions = {
  'Acolyte': 'A novice caster who siphons mana and energy. At level 10 can slow enemies on hit.',
  'Ruffian': 'A rogue who steals coins and disrupts casters. At level 10 will shed armor based on gold looted.',
  'Warden': 'A stalwart, obediant warrior who excels in wearing heavy armor. At level 10 reduces damage taken',
}



const switchVocation = (vocation, playerData, setPlayerData, playerLevels, setActiveVocation) => {
  console.log("Switching vocation")
  let newPlayerData = {...playerData}
  let oldVocation = playerData.activeVocation
  let playerLevel = playerLevels[vocation][0]

  // Remove old spells
  if (oldVocation) {
    let oldVocationLevel = playerLevels[oldVocation][0]
    for (let unlock of ABILITIES[oldVocation]) {

      if (unlock.levelRequirement <= oldVocationLevel) {
        
        // Remove old spell
        if (unlock.abilityType === 'spell') {
          console.log(`Removed ${unlock.name} to player's spellbook`)
          newPlayerData.combatStats.spells = newPlayerData.combatStats.spells.filter(spell => spell.name !== unlock.name);
        }

        // Update active on-hit effects
        else if (unlock.abilityType === 'proc') {
          console.log(`Removed ${unlock.name} from onHitEffects for player`)
          newPlayerData.combatStats.onHitEffects = newPlayerData.combatStats.onHitEffects.filter(onHit => onHit.name !== unlock.name);
        }

        // Add passive bonuses
        else if (unlock.abilityType === 'passive') {
          for (const [bonus, amount] of Object.entries(unlock.passiveEffect)) {
            newPlayerData.combatStats[bonus] -= amount
            console.log(`removed ${amount} from ${bonus} for player. Old = ${playerData.combatStats[bonus]} ,New = ${newPlayerData.combatStats[bonus]}`)
            }
          }
        }
      }
  }

  // Add new spells
  for (let unlock of ABILITIES[vocation]) {

    // If level requirement is satisfied, unlock ability
    if (unlock.levelRequirement <= playerLevel) {

      // Add new spells
      if (unlock.abilityType === 'spell') {
        console.log(`added ${unlock.name} to player's spellbook`)
        newPlayerData.combatStats.spells.push(unlock)
      }

      // Update active on-hit effects
      else if (unlock.abilityType === 'proc') {
        console.log(`added ${unlock.applyEffect} to onHitEffects for player`)
        newPlayerData.combatStats.onHitEffects.push(unlock)
      }

      // Add passive bonuses
      else if (unlock.abilityType === 'passive') {
        for (const [bonus, amount] of Object.entries(unlock.passiveEffect)) {
          console.log(`Before applying passive =${newPlayerData.combatStats[bonus]}`)
          if (bonus in newPlayerData.combatStats) {
            newPlayerData.combatStats[bonus] += amount
          }
          else {
            newPlayerData.combatStats[bonus] = amount
          }
          console.log(`After applying passive to ${bonus} =${newPlayerData.combatStats[bonus]}`)
          }
        }

      }
    }
  


  console.log('Updating!')
  console.log(`newPlayerData =  ${JSON.stringify(newPlayerData)}`)
  newPlayerData.activeVocation = vocation
  setPlayerData(newPlayerData)
  setActiveVocation(vocation)
}


function AbilityClassWindow({vocation}) {
    const {activeTask, setActivetask, playerData, setPlayerData, playerLevels, activeVocation, setActiveVocation} = useContext(PlayerDataContext)
    
    return (
        <div className="classWindow">
          {vocation}
          <p className="classDescription">
            {descriptions[vocation]}
          </p>
          <AbilityRow abilityList={ABILITIES[vocation]}/>
          <div className="vocationXp">
          <a>Level {playerLevels[vocation][0]}</a>
            <div className="vocationProgressBar">
              <LinearProgress style={{padding: "5px", borderRadius: "5px"}} variant="determinate" value={playerLevels[vocation][1]}/>
            </div>
            <a>{playerLevels[vocation][1].toFixed(1)}%</a>
            <Button sx={{fontSize: "10px", fontWeight: "bold"}} variant="contained" className="sellButton" onClick={(e) => switchVocation(vocation, playerData, setPlayerData, playerLevels, setActiveVocation)}> Equip </Button>
          </div>
        </div>
    );
  }
  
  export default AbilityClassWindow;