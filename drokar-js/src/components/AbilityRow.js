
import { ABILITIES } from "../helpers/AbilityData";
import { useContext } from "react";


function AbilityRow(data) {
    const {playerData, setPlayerData} = useContext(PlayerDataContext)
    
    // TODO 
    // Return a div containing 2 abilities and passive effect for vocation. Grey out the ones that aren't available.
    // They should provide descriptions on mouseover.
    // Have blue border for magic attacks, grey for passive, black for melee attacks, olive for ranged.
    return (
    <div className="abilityRowContainer">
        {data.map(function(name, i) {
        return <div className="vocationBox" onClick={(e) => setActiveVocation(name)}>
            <img src={ABILITIES.name.img} alt={`${name} icon`}/>
            {name} - Level {playerData.skills[name]}
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