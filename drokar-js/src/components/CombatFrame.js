import { LinearProgress, createTheme } from "@mui/material";
import { Gavel, Favorite, AutoAwesome, Cyclone, ColorizeSharp } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState, useRef } from "react";
import "./Combat.css";

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



function CombatFrame({playerData, name, setFunc}) {
    console.log("ding")
    var combatData = playerData.combatStats
    var percentHp = combatData.currentHp / combatData.maxHp * 100
    var percentMana = combatData.currentMana / combatData.maxMana * 100
    var percentFury = combatData.currentFury / combatData.maxFury * 100
    var attackSpeed = combatData.attackSpeed
    var healthColor = calculateColor(percentHp)

    const [attackProg, setAttackProg] = useState(0)
    //console.log(attackProg)
    const refAttackProg = useRef('')
    useEffect(() => {
        // console.log(`old=${refAttackProg.current} new = ${attackProg}`)
        if (refAttackProg.current > attackProg) {
            console.log("Attacking")
            let newComData = {...playerData}
            playerData.combatStats.currentHp -= 5
            console.log(Date.now())
            setFunc(newComData)
        }
        refAttackProg.current = attackProg
        }, [attackProg])
    // useEffect(() => {
    //     var tickRate = 200;
    //     const prog =  (tickRate / attackSpeed) * 100
    //     const timer = setInterval(() => {
    //         setAttackProg(prev => (prev + prog)% 100)
    //         }, tickRate)
    //     return () => clearInterval(timer)
    //     }
    // , [])
    // const DUMMYCOMBAT_DATA = {
    //     currentHp: 35,
    //     maxHp: 50,
    //     currentMana: 10,
    //     maxMana: 20,
    //     currentFury: 100,
    //     maxFury: 100
    // }
    

    return (
    <div className="combatFrame">
        <div className="combatPanel">
            <div className="flexContainer">
                {playerData.combatStats.currentHp <= 0 
                ? <p>You R ded lmoa</p>
                : <img src={combatData.img} alt="fighter"/>
                }
                
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
                    variant={percentFury >= 100 ? "indeterminate" : "determinate"}  /* Animate when full */
                    color="warning"
                    sx={{
                        width:"75%",
                        margin: "0 5px",
                        }} />
                <Cyclone color="warning"/>
                {combatData.currentFury}/{combatData.maxFury} 
            </div>
            {activeAttack.length > 0  ? <p className="attackName">{activeAttack[0]} - {(activeAttack[1] / 1000).toFixed(2)}s</p> : null}
            {activeAttack.length > 0  ?
                <div className="combatBarIcon">
                    <LinearProgress 
                        value={attackProg} 
                        variant={"determinate"} /* Animate when full */
                        color="error"
                        sx={{
                            width:"75%",
                            margin: "0 5px",
                            "& .MuiLinearProgress-bar": {
                                transition: "transform .1s linear"
                            }
                            }} />
                    <ColorizeSharp color="error" sx={{transform: "scaleY(-1)"}}/>
                    {(combatData.attackSpeed/1000).toFixed(2)} /s
            </div>
        </div>
        <div className="combatStats">
            {name} - Lv {combatData.level || 1}
            <div className= "divider"></div>
            Damage: {combatData.meleeDamage} <br></br>
            Attack speed : {combatData.attackSpeed/1000}s<br></br>
            <div className= "divider"></div>
            Melee Defense: {combatData.armor}<br></br>
            Ranged Defense: {combatData.rangedArmor}<br></br>
            Magic Defense: {combatData.magicArmor}<br></br>
            <div className= "divider"></div>
            <h3>Attacks</h3>
            {combatData.attacks.map((attack, i) => {
                return <div key={i}>
                    {attack.name} - {(combatData.attackChances[i]*100).toFixed(1)} %
                </div>
            }
            
            )}
               
        </div>
    </div>
    );
  }
  
  export default CombatFrame;