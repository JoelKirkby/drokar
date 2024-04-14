
import '../App.css'
import './AbilityWindow.css'
import AbilityClassWindow from './AbilityClassWindow';
import AbilityEquippedWindow from './AbilityEquippedWindow';


function AbilityWindow(props) {
    return (
        <div className="flexContainer">
            <div className="vocationList">
              {
                Object.keys(ABILITIES).map((vocation) => 
                {
                  return <AbilityClassWindow vocation={vocation}/>
                }
                )
              }
      
            </div>

            <AbilityEquippedWindow/>


         </div>
    );
  }
  
  export default AbilityWindow;