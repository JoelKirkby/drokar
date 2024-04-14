
import './AbilityWindow.css';
import '../App.css'
import { ABILITIES } from "../helpers/AbilityData";
import { useContext } from "react";
import { PlayerDataContext } from "../helpers/Contexts";
import Tooltip from '@mui/material/Tooltip';

function AbilityRow({abilityList}) {
    
    // TODO 
    // Return a div containing 2 abilities and passive effect for vocation. Grey out the ones that aren't available.
    // They should provide descriptions on mouseover.
    // Have blue border for magic attacks, grey for passive, black for melee attacks, olive for ranged.
    return (
    <div className="abilityRowContainer">
        <div className="textWrapper">
        <div className="ability active">
            <Tooltip title={abilityList[0].description}>
                <img src={abilityList[0].img} className="abilityImg" alt={`${abilityList[0].name} icon`}/>
            </Tooltip>
        </div>
        Active
        </div>

        <div className="ability blank"></div>
        <div className="textWrapper">
        <a className='lvlText'>Lvl 1</a>    
        <a className='lvlText'>Lvl 10</a>
        <div className='flexContainer'>
            <div className="ability passive">
                <Tooltip title={abilityList[1].description}>
                    <img src={abilityList[1].img} className="abilityImg" alt={`${abilityList[1].name} icon`}/>
                </Tooltip>
            </div>
            <div className="ability passive">
                <Tooltip title={abilityList[2].description}>
                    <img src={abilityList[2].img} className="abilityImg" alt={`${abilityList[2].name} icon`}/>
                </Tooltip>
            </div>
          
        </div>
        Passive
        </div>
    </div>
    )

}

export default AbilityRow