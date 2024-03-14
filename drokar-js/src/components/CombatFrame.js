import { LinearProgress, createTheme } from "@mui/material";
import { Gavel, Favorite, AutoAwesome, Cyclone } from "@mui/icons-material";
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
    console.log(`name = ${name} ${JSON.stringify(combatData)}`)

    
    var percentHp = combatData.currentHp / combatData.maxHp * 100
    var percentMana = combatData.currentMana / combatData.maxMana * 100
    var percentFury = combatData.currentFury / combatData.maxFury * 100
    
    return (
    <div className="combatFrame">
        <div className="combatPanel">
            {name} - Lv {combatData.level}
            <img src={combatData.img} alt="fighter"/>
            <div className="combatBarIcon">
            
            <LinearProgress 
                value={percentHp} 
                variant="determinate" 
                // color="success" 
                sx={{
                    backgroundColor: 'white',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: calculateColor(percentHp)},
                    width:"75%",
                    margin: "0 5px",
                    }} />
            <Favorite color="success"/>
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
                <Cyclone color="error"/>
                {combatData.attackSpeed} 
            </div>
        </div>
        <div className="combatStats">
            Wow
        </div>
    </div>
    );
  }
  
  export default CombatFrame;