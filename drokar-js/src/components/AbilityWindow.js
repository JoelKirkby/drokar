
import '../App.css'
import { PlayerDataContext } from '../helpers/Contexts';
import { useContext } from 'react';
import Inventory from './Inventory';
import ItemInfoPanel from './ItemInfoPanel';

function AbilityWindow(props) {
    const {activeTask, setActivetask, playerData} = useContext(PlayerDataContext)
    return (
        <div>
            <div className="vocationList">
            </div>
            <div className="skillSelection">
              <div className="equippedSkills">
                Equipped skills
              </div>
              <div className="equippedSkills">
                Available skills
              </div>

            </div>
      </div>
    );
  }
  
  export default AbilityWindow;