
import '../App.css'
import './AbilityWindow.css';
import { useContext } from 'react';
import { PlayerDataContext } from '../helpers/Contexts';
import AbilityRow from './AbilityRow';
import { ABILITIES } from '../helpers/AbilityData';
import LevelProgress from './LevelProgress';
import Tooltip from '@mui/material/Tooltip';

function AbilityEquippedWindow({playerData}) {
  const {playerLevels, activeVocation} = useContext(PlayerDataContext)

  // If no flex abilities selected, placeholder text is shown
  let placeholder = {
    description: "Double click on any unlocked ability to equip it here.",
  }
  var flexAbility0 = playerData.flexAbility0 ? playerData.flexAbility0 : placeholder
  var flexAbility1 = playerData.flexAbility1 ? playerData.flexAbility1 : placeholder
  var flex0unlocked = playerLevels[activeVocation][0] >= 8 ? ' unlocked' : ' locked'
  var flex1unlocked = playerLevels[activeVocation][0] >= 16 ? ' unlocked' : ' locked'
  
    return (
          <div className='equippedWindow'>
            <p>{playerData.name} the {activeVocation}</p>
            <LevelProgress size="6" skill={activeVocation}/>
            <p>Bonuses from active Vocation</p>
            <AbilityRow vocation={activeVocation} levels={playerLevels}/>
            <h3> Flex abilities </h3>
            <p> At vocation levels 8 and 16 you can choose an extra passive or active ability from any other vocation. </p>
            <div className="textWrapper">
              <div className='flexContainer spaceAround'>

                <div className={flex0unlocked}>
                    <a className='lvlText'>Level 8</a>   
                    <div className={"ability passive"}>
                      <Tooltip title={flexAbility0.description}>
                          {flexAbility0.img ? <img src={flexAbility0.img} className='ability passive' alt={`${flexAbility0.name} icon`}/> : <a>Equip Ability</a>}
                      </Tooltip>
                    </div>
                </div>

                <div className={flex1unlocked}>
                    <a className='lvlText'>Level 16</a>   
                    <div className="ability passive">
                      <Tooltip title={flexAbility1.description}>
                        {flexAbility1.img ? <img src={flexAbility1.img} className='ability passive' alt={`${flexAbility1.name} icon`}/> : <a>Equip Ability</a>}
                        </Tooltip>
                    </div>
                </div>
              </div>
        </div>
          </div>
    );
  }
  
  export default AbilityEquippedWindow;