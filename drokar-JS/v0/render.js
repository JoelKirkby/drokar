const {ipcRenderer, remote} = require('electron');

//const sleep = require('util').promisify(setTimeout)

let togl = -1;

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  

const generateXP = async() => {
    togl*=-1
    while (togl !==-1){
        console.log("Reached this point")
        await sleep(1000)
        ipcRenderer.send('generateXP',
            document.querySelector('.XPmeter').value,
            document.querySelector('.XPmeter').max,
        );
    }
};


const idlemine = async (data,max,character,togl) => {
        //console.log(togl)
        //await sleep(500)
    
        const passwordTag=document.querySelector('.XPmeter'); //# = ID, . = class
        passwordTag.value = data;
        const xpnumbers = document.querySelector('#expval');

        //Leveling up
        if (passwordTag.max < data) {
            const Level = document.querySelector('#password');
            Level.classList.remove('fadeOut');
            Level.classList.add('fadeIn');
            passwordTag.max*=1.104;
            passwordTag.value=data-max;
            max=passwordTag.max;
            data=passwordTag.value;

            character.mininglvl+=1;
            console.log("Mining level is now "+character.mininglvl.toString())
            Level.innerText = "You leveled up to level "+character.mininglvl.toString()//+newlvl+"!";
            const Timerfunc = setTimeout(fade_out,500);
            ipcRenderer.send('levelup',character.mininglvl)
        }
        inputstr = Math.round(data).toString()+' mining XP. Next level = '+Math.round(max.toString())+' XP'//' ('((data/max)*100).toString()+') ';
        xpnumbers.innerText=inputstr;
        outputpc=((data/max)*100).toFixed(2).toString();
        const xppc = document.querySelector('#exppercent');
        xppc.innerText = outputpc+'% to next level'
        //await sleep(1000)
    }
    //const xpprog = document.querySelector('#expvalues');
    //xpprog.innerText=xpnumbers;
   


//}

ipcRenderer.on('newXP', (event, data,max,character,togl) => {

    //idlemine(data,max,character,togl)
    // while (togl !==-1){
    //     sleep(1000).then(() => {
    //         //do stuff
    //       })
    const passwordTag=document.querySelector('.XPmeter'); //# = ID, . = class
    passwordTag.value = data;
    const xpnumbers = document.querySelector('#expval');

    //Leveling up
    if (passwordTag.max < data) {
        const Level = document.querySelector('#password');
        Level.classList.remove('fadeOut');
        Level.classList.add('fadeIn');
        passwordTag.max*=1.104;
        passwordTag.value=data-max;
        max=passwordTag.max;
        data=passwordTag.value;

        character.mininglvl+=1;
        console.log("Mining level is now "+character.mininglvl.toString())
        Level.innerText = "You leveled up to level "+character.mininglvl.toString()//+newlvl+"!";
        const Timerfunc = setTimeout(fade_out,500);
        ipcRenderer.send('levelup',character.mininglvl)

    }
    inputstr = Math.round(data).toString()+' mining XP. Next level = '+Math.round(max.toString())+' XP'//' ('((data/max)*100).toString()+') ';
    xpnumbers.innerText=inputstr;
    outputpc=((data/max)*100).toFixed(2).toString();
    const xppc = document.querySelector('#exppercent');
    xppc.innerText = outputpc+'% to next level'

        //await sleep(1000)
    }
//const xpprog = document.querySelector('#expvalues');
//xpprog.innerText=xpnumbers;
   
);


function fade_out() {
    const Level = document.querySelector('#password');
    Level.classList.add('fadeOut');
    Level.classList.remove('fadeIn');
}