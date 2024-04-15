
import '../App.css'
import './AbilityWindow.css';
import { useContext } from 'react';
import { PlayerDataContext } from '../helpers/Contexts';
import AbilityRow from './AbilityRow';
import { ABILITIES } from '../helpers/AbilityData';
import LevelProgress from './LevelProgress';

function AbilityEquippedWindow({playerData}) {
  const {playerLevels, activeVocation} = useContext(PlayerDataContext)
  var ability0_className = playerData.flexAbility0 == [] ? "ability empty" : "ability active"
  var ability1_className = playerData.flexAbility1 == [] ? "ability empty" : "ability active"
    return (
          <div className='equippedWindow'>
            <p>{playerData.name} the {activeVocation}</p>
            <LevelProgress size="5" skill={activeVocation}/>
            <p>Bonuses from active Vocation</p>
            <AbilityRow abilityList={ABILITIES[activeVocation]}/>
            <h3> Flex abilities </h3>
            <p> At vocation levels 8 and 16 you can choose an extra passive or active ability from any other vocation. </p>
            <div className="textWrapper">
                
              
            <div className='flexContainer spaceAround'>
                <div className={ability0_className}>
                  <p className='lvlText'>Lvl 8</p>  
                    Ability 1 placeholder
                      {/* <Tooltip title={abilityList[1].description}>
                          <img src={abilityList[1].img} className="abilityImg" alt={`${abilityList[1].name} icon`}/>
                      </Tooltip> */}
                </div>
                <div className={ability1_className}>
                  <p className='lvlText'>Lv 16</p>
                    Ability 2 placeholder
                    {/* <Tooltip title={abilityList[2].description}>
                          <img src={abilityList[2].img} className="abilityImg" alt={`${abilityList[2].name} icon`}/>
                      </Tooltip> */}
                  <p>Mana Drain</p>
                </div>
            
            </div>
            Flex Abilities
        </div>
          </div>
    );
  }
  
  export default AbilityEquippedWindow;