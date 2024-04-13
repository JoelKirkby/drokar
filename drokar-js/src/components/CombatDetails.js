import { useContext } from "react";
import { PlayerDataContext } from '../helpers/Contexts';
function CombatDetails(props) {
    const {playerData, setPlayerData} = useContext(PlayerDataContext)
    let combatData = playerData.combatStats
    return (
        <div className="combatDetails">
            {playerData.name} - Lv {combatData.level || 1}
            <div className= "divider"></div>
            Damage: {combatData.meleeDamage} <br></br>
            Attack speed : {combatData.attackSpeed/1000}s<br></br>
            <div className= "divider"></div>
            Melee Defense: {combatData.meleeArmor}<br></br>
            Ranged Defense: {combatData.rangedArmor}<br></br>
            Magic Defense: {combatData.magicArmor}<br></br>
            <div className= "divider"></div>
            <h3>Attacks</h3>
            {combatData.attacks.map((attack, i) => {
                return <div key={i}>
                    {attack.name} - {(combatData.attackChances[i]*100).toFixed(1)} %
                </div>
            }
            
            )}
               
        </div>
    );
  }
  
  export default CombatDetails;