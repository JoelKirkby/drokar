const {app, BrowserWindow, ipcMain,remote} = require('electron');

let win = null;
let togl = -1;


global.character = {
    mininglvl:1,
    smithinglvl:1};

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height:600,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('index.html') //Load HTML file
};

app.whenReady().then(createWindow);

ipcMain.on('generateXP', (event,data,max) => {
        event.preventDefault();
        const  newXP = (data + 30);
        win.webContents.send('newXP',newXP,max,character,togl);

    //await sleep(1000);
});

ipcMain.on('levelup' , (event, lvlup) => {
    event.preventDefault();
    character.mininglvl = lvlup

})

