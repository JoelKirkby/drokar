
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
            </div>
            </div>
            Flex Abilities
              </div>
            Flex Abilities
              </div>
            </div>
            Flex Abilities
              </div>
            Flex Abilities
              </div>
            </div>
            </div>
            Flex Abilities
              </div>
            Flex Abilities
              </div>
            </div>
            Flex Abilities
              </div>
            Flex Abilities
              </div>
            </div>
            </div>
            </div>
            Flex Abilities
              </div>
            Flex Abilities
              </div>
            </div>
            Flex Abilities
              </div>
            Flex Abilities
              </div>
            </div>
            </div>
            Flex Abilities
              </div>
            Flex Abilities
              </div>
            </div>
            Flex Abilities
              </div>
            Flex Abilities
        </div>
          </div>
    );
  }
  
  export default AbilityEquippedWindow;