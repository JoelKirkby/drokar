
import './AbilityWindow.css';
import '../App.css'
import { ABILITIES } from "../helpers/AbilityData";
import { useContext } from "react";
import { PlayerDataContext } from "../helpers/Contexts";
import Tooltip from '@mui/material/Tooltip';

function AbilityRow({vocation, levels}) {
    let abilityList = ABILITIES[vocation]
    // TODO 
    // Return a div containing 2 abilities and passive effect for vocation. Grey out the ones that aren't available.
    // They should provide descriptions on mouseover.
    // Have blue border for magic attacks, grey for passive, black for melee attacks, olive for ranged.

    // If the player has the required level, the ability uses unlocked styling with full opacity.
    let active1Class = levels[vocation][0] >= abilityList[0].levelRequirement ? 'abilityImg unlocked' : 'abilityImg locked'
    let passive1Class = levels[vocation][0] >= abilityList[1].levelRequirement ? 'abilityImg unlocked' : 'abilityImg locked'
    let passive2Class = levels[vocation][0] >= abilityList[2].levelRequirement ? 'abilityImg unlocked' : 'abilityImg locked'

    return (
    <div className="abilityRowContainer">
        <div className="textWrapper">
        <a className='lvlText'>Level 5</a>  
        <div className="ability active">
            <Tooltip title={abilityList[0].description}>
                <img src={abilityList[0].img} className={active1Class} alt={`${abilityList[0].name} icon`}/>
            </Tooltip>
        </div>
        Ability
        </div>

        <div className="ability blank"></div>
        <div className="textWrapper">
            <div className='flexContainer'>
                <div>
                <a className='lvlText'>Level 1</a>   
                <div className="ability passive">
                    <Tooltip title={abilityList[1].description}>
                        <img src={abilityList[1].img} className={passive1Class} alt={`${abilityList[1].name} icon`}/>
                    </Tooltip>
                </div>
                </div>
                <div>
                <a className='lvlText'>Level 10</a>  
                <div className="ability passive">
                    <Tooltip title={abilityList[2].description}>
                        <img src={abilityList[2].img} className={passive2Class} alt={`${abilityList[2].name} icon`}/>
                    </Tooltip>
                </div>
                </div>
            
            </div>
            Passives
        </div>
    </div>
    )
}

export default AbilityRow