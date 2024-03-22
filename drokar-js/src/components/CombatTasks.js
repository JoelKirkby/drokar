import { Button } from "@mui/material";
import { MonsterData } from "../helpers/MonsterData";
import { useState, useContext } from "react";
import { PlayerDataContext } from "../helpers/Contexts";
import "./Combat.css";

const setMonsterData = (monsterName, setActiveMonster) => {
    // Set current health values to max health
    let combatStats = {...MonsterData[monsterName].combatStats,
                    name: monsterName,
                    currentHp: MonsterData[monsterName].combatStats.maxHp,
                    currentMana: MonsterData[monsterName].combatStats.maxMana,
                    currentFury: 0,
                    maxFury: 100,
                    }

    let activeMonster = {...MonsterData[monsterName], combatStats: combatStats}
    setActiveMonster(activeMonster)
}

function CombatTasks() { 
    const [selectedMonster, setSelectedMonster] = useState('')
    const {activeMonster, setActiveMonster} = useContext(PlayerDataContext)
    return (
        <div className="combatTasks">
            {Object.keys(MonsterData).map(function(monsterName, i) {
                return <div className="monsterTask" onClick={(e) => setMonsterData(monsterName, setActiveMonster)}>
                    <img src={MonsterData[monsterName].combatStats.img} alt="monster"/>
                    {monsterName} - Level {MonsterData[monsterName].combatStats.level}
                    </div>
            }         
            )}
            {selectedMonster ? <div>Selected Monster: {selectedMonster}</div> : null}
            {/* <Button variant="contained" color="error" onClick={() => setMonsterData(selectedMonster, setActiveMonster)}> Fight! </Button> */}
        </div>
    )
    }
  
  export default CombatTasks;