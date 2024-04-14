
import '../App.css'
import './AbilityWindow.css'
import AbilityClassWindow from './AbilityClassWindow';
import AbilityEquippedWindow from './AbilityEquippedWindow';


function AbilityWindow(props) {
    const {activeTask, setActivetask, playerData, activeVocation, setActiveVocation} = useContext(PlayerDataContext)
    console.log(`playerData.activeVocation: ${playerData.activeVocation}`)
    return (
        <div className="flexContainer">
            <div className="vocationList">
              Acolyte abilities
              <AbilityRow vocation="Acolyte"/>
              Ruffian abilities
              <AbilityRow vocation="Ruffian"/>
              Squire abilities
              <AbilityRow vocation="Squire"/>
            </div>
                return <div className="vocationBox" onClick={(e) => setActiveVocation(ability.name)}>
                    <img src={ability.img} alt={`${ability.name} icon`}/>
                    {ability.name} - Level {playerData.skills[ability.name]}
                    </div>
                })}    
            </div>
            <div className="skillSelection">
              skillSelection
              <div className="equippedSkills">
                <AbilityRow data={playerData.activeVocation}/>
              </div>
              <div className="availableSkills">
                {activeVocation 
                ? <AbilityRow data={activeVocation}/>
                : null}
                Available skills
              </div>

            </div>
      </div>
    );
  }
  
  export default AbilityWindow;