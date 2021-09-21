// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const ipc = ipcMain

function createWindow() {
    // Create the browser window.
    let mainWindow = new BrowserWindow({
        width: 1100,
        minWidth: 1100,
        height: 638,
        minHeight: 638,
        //remove the standard titlebar menu
        frame: false,
        //for the app's icon !! (Windwos and Linux) for OsX use electron packeger
        //icon: __dirname+'/img/icon.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    })
    mainWindow.setMenuBarVisibility(false)
    // and load the index.html of the app.
    mainWindow.loadFile('src/index.html')
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    //Minimize app
    ipc.on('minimizeApp', () => {
        //console.log('Clicked on minimizeBtn')
        mainWindow.minimize()
    })
    //Maximize Restore app
    ipc.on('maximizeRestoreApp', () => {
        if (mainWindow.isMaximized()) {
            //console.log('Clicked on maxResBtn and the window was restored')
            mainWindow.restore()
        } else {
            mainWindow.maximize()
            //console.log('Clicked on maxResBtn and the window was maximized')
        }
    })
    //Check if is maximized
    mainWindow.on('maximize', () => {
        mainWindow.webContents.send('isMaximized')
    })
    //Check if is restored
    mainWindow.on('unmaximize', () => {
        mainWindow.webContents.send('isRestored')
    })
    //Close app
    ipc.on('closeApp', () => {
        //console.log('Clicked on closeBtn')
        mainWindow.close()
    })
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.