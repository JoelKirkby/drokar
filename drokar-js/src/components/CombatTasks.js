import { Button } from "@mui/material";
import { MonsterData } from "../helpers/MonsterData";
import { useState, useContext } from "react";
import { PlayerDataContext } from "../helpers/Contexts";
import "./Combat.css";

const setMonsterData = (selectedMonster, setActiveMonster) => {
    // Set current health values to max health
    let combatStats = {...MonsterData[selectedMonster].combatStats,
                    name: selectedMonster,
                    currentHp: MonsterData[selectedMonster].combatStats.maxHp,
                    currentMana: MonsterData[selectedMonster].combatStats.maxMana,
                    currentFury: 0,
                    maxFury: 100,
                    }

    let activeMonster = {...MonsterData[selectedMonster], 
            combatStats: combatStats,
            name: selectedMonster
        }
    setActiveMonster(activeMonster)
}

const fleeCombat = (activeCombat, setActiveCombat, setActiveMonster) => {
    console.log("Fleeing combat")
    if (activeCombat) {
        setActiveCombat(false)
        clearInterval(activeCombat)
    }
    setActiveMonster({})
}

function CombatTasks() { 
    const [selectedMonster, setSelectedMonster] = useState('')
    const {activeMonster, setActiveMonster, activeCombat, setActiveCombat} = useContext(PlayerDataContext)
    return (
        <div className="combatTasks">
            {Object.keys(MonsterData).map(function(monsterName, i) {
                return <div className="monsterTask" onClick={(e) => setSelectedMonster(monsterName)}>
                    <img src={MonsterData[monsterName].combatStats.img} alt="monster"/>
                    {monsterName} - Level {MonsterData[monsterName].combatStats.level}
                    </div>
            }         
            )}
            {selectedMonster 
                ? <div>
                    Selected Monster: {selectedMonster}
                    <div className="fightButtons">
                    <Button variant="contained" className="paddedBtn" color="error" onClick={() => setMonsterData(selectedMonster, setActiveMonster)}> Target </Button>
                    <Button variant="contained" color="warning" onClick={() => fleeCombat(activeCombat, setActiveCombat, setActiveMonster)}> Flee in Terror! </Button>
                    </div>
                </div>
             : null}
        </div>
    )
    }
  
  export default CombatTasks;