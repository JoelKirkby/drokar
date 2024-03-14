import { LinearProgress, createTheme } from "@mui/material";
import { Gavel, Favorite, AutoAwesome, Cyclone, ColorizeSharp } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";

const calculateColor = (percent) => {
    //value from 0 to 100
    // percent = percent / 100
    var hue=(percent*1.2).toString(10);
    return ["hsl(",hue,",90%,40%)"].join("");

}

const theme = createTheme({
    palette: {
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#3f51b5',
      },
      warning: {
        main: '#fda50f',
      },
    },
  });


function CombatFrame({combatData, name}) {

    // const DUMMYCOMBAT_DATA = {
    //     currentHp: 35,
    //     maxHp: 50,
    //     currentMana: 10,
    //     maxMana: 20,
    //     currentFury: 100,
    //     maxFury: 100
    // }
    var percentHp = combatData.currentHp / combatData.maxHp * 100
    var percentMana = combatData.currentMana / combatData.maxMana * 100
    var percentFury = combatData.currentFury / combatData.maxFury * 100
    var healthColor = calculateColor(percentHp)
    return (
    <div className="combatFrame">
        <div className="combatPanel">
            <div className="flexContainer">
                <img src={combatData.img} alt="fighter"/>
            </div>
            <div className="combatBarIcon">
            
            <LinearProgress 
                value={percentHp} 
                variant="determinate" 
                // color="success" 
                sx={{
                    backgroundColor: 'white',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: healthColor},
                    width:"75%",
                    margin: "0 5px",
                    }} />
            <Favorite style={{fill: healthColor}}/>
            {combatData.currentHp}/{combatData.maxHp}
            </div>

            <div className="combatBarIcon">
                <ThemeProvider theme={theme}>
                <LinearProgress 
                    value={percentMana} 
                    variant="determinate" 
                    color="secondary"
                    sx={{
                        width:"75%",
                        margin: "0 5px",
                        }} />
                <AutoAwesome color="primary"/>
                {combatData.currentMana}/{combatData.maxMana}
                </ThemeProvider>
            </div>

            <div className="combatBarIcon">
                <LinearProgress 
                    value={percentFury} 
                    variant={percentFury === 100 ? "indeterminate" : "determinate"} /* Animate when full */
                    color="warning"
                    sx={{
                        width:"75%",
                        margin: "0 5px",
                        }} />
                <Cyclone color="warning"/>
                {combatData.currentFury}/{combatData.maxFury} 
            </div>

            <div className="combatBarIcon">
                <LinearProgress 
                    value={percentFury} 
                    variant={percentFury === 100 ? "indeterminate" : "determinate"} /* Animate when full */
                    color="error"
                    sx={{
                        width:"75%",
                        margin: "0 5px",
                        }} />
                <ColorizeSharp color="error" sx={{transform: "scaleY(-1)"}}/>
                {(combatData.attackSpeed/1000).toFixed(2)} /s
            </div>
        </div>
        <div className="combatStats">
            {name} - Lv {combatData.level || 1}
            <div className= "divider"></div>
            Damage: {combatData.damage} <br></br>
            Attack speed : {combatData.attackSpeed/1000}s<br></br>
            <div className= "divider"></div>
            Melee Defense: {combatData.armor}<br></br>
            Ranged Defense: {combatData.rangedArmor}<br></br>
            Magic Defense: {combatData.magicArmor}<br></br>
            <div className= "divider"></div>
            {/* Attacks: {TODO - show attacks list.} */}
        </div>
    </div>
    );
  }
  
  export default CombatFrame;