import { Button } from "@mui/material";
import { MonsterData } from "../helpers/MonsterData";
import { useState, useContext } from "react";
import { PlayerDataContext } from "../helpers/Contexts";
import "./Combat.css";

const setMonsterData = (selectedMonster, setActiveMonster) => {
    // Set current health values to max health
    let combatObject = {...MonsterData[selectedMonster],
                    name: selectedMonster,
                    currentHp: MonsterData[selectedMonster].maxHp,
                    currentMana: MonsterData[selectedMonster].maxMana,
                    currentFury: 0,
                    maxFury: 100,
                    }
    
    console.log(`combatObject = ${JSON.stringify(combatObject)}`)
    setActiveMonster(combatObject)
}

function CombatTasks() { 
    const [selectedMonster, setSelectedMonster] = useState('')
    console.log(`selectedMonster = ${selectedMonster}`)
    const {activeMonster, setActiveMonster} = useContext(PlayerDataContext)
    console.log(`activeMonster = ${activeMonster}`)
    return (
        <div className="combatTasks">
            {Object.keys(MonsterData).map(function(monsterName, i) {
                return <div className="monsterTask" onClick={(e) => setSelectedMonster(monsterName)}>
                    <img src={MonsterData[monsterName].img} alt="monster"/>
                    {monsterName} - Level {MonsterData[monsterName].level}
                    </div>
            }         
            )}
            {selectedMonster ? <div>Selected Monster: {selectedMonster}</div> : null}
            <Button variant="contained" color="error" onClick={() => setMonsterData(selectedMonster, setActiveMonster)}> Fight! </Button>
        </div>
    )
    }
  
  export default CombatTasks;