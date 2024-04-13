
import { ABILITIES } from "../helpers/AbilityData";
import { useContext } from "react";
import { PlayerDataContext } from "../helpers/Contexts";

function AbilityRow({data}) {
    const {playerData, setPlayerData, setActiveVocation} = useContext(PlayerDataContext)
    
    // TODO 
    // Return a div containing 2 abilities and passive effect for vocation. Grey out the ones that aren't available.
    // They should provide descriptions on mouseover.
    // Have blue border for magic attacks, grey for passive, black for melee attacks, olive for ranged.
    console.log(`data: ${data}`)
    console.log(`data: ${JSON.stringify(data)}`)
    return (
    <div className="abilityRowContainer">
        {ABILITIES[data].map(function(obj, i) {
        return <div className="vocationBox" onClick={(e) => setActiveVocation(obj.name)}>
            <img src={obj.img} alt={`${obj.name} icon`}/>
            {obj.name} - Level {playerData.skills[obj.name]}
            </div>
        })
        }    
    </div>
    )

    // .map(function(name, i) {
    // return <div className="vocationBox" onClick={(e) => setActiveVocation(name)}>
    //     <img src={ABILITIES.name.img} alt={`${name} icon`}/>
    //     {name} - Level {playerData.skills[name]}
    //     </div>
    // })    
}

export default AbilityRow