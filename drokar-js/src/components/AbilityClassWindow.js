
import '../App.css'
import './AbilityWindow.css'
import { PlayerDataContext } from '../helpers/Contexts';
import { useContext } from 'react';
import AbilityRow from './AbilityRow';
import { ABILITIES } from '../helpers/AbilityData';
import { useState } from 'react';
import { LinearProgress } from "@mui/material";
import { Button } from '@mui/material';


import './AbilityWindow.css';

const descriptions = {
  'Acolyte': 'A novice caster who siphons mana and energy. At level 10 can slow enemies on hit.',
  'Ruffian': 'A rogue who steals coins and disrupts casters. At level 10 will shed armor based on gold looted.',
  'Warden': 'A stalwart, obediant warrior who excels in wearing heavy armor. At level 10 reduces damage taken',
}

function AbilityClassWindow({vocation}) {
    const {activeTask, setActivetask, playerData, playerLevels, activeVocation, setActiveVocation} = useContext(PlayerDataContext)
    console.log(`playerData.activeVocation: ${playerData.activeVocation}`)
    console.log(`ClassWindow = ${vocation}`)
    console.log(`playerLevels = ${JSON.stringify(playerLevels)}`)
    
    return (
        <div className="classWindow">
          {vocation}
          <p className="classDescription">
            {descriptions[vocation]}
          </p>
          <AbilityRow vocation={vocation}/>
          <div className="vocationXp">
          <a>Level {playerLevels[vocation][0]}</a>
            <div className="vocationProgressBar">
              <LinearProgress style={{padding: "5px", borderRadius: "5px"}} variant="determinate" value={playerLevels[vocation][1]}/>
            </div>
            <a>{playerLevels[vocation][1].toFixed(1)}%</a>
            <Button sx={{fontSize: "10px", fontWeight: "bold"}} variant="contained" className="sellButton" onClick={(e) => setActiveVocation(vocation)}> Equip </Button>
          </div>
        </div>
    );
  }
  
  export default AbilityClassWindow;