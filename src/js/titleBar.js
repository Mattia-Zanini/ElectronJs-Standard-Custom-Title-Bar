const { ipcRenderer } = require('electron')
const maxResBtn = document.getElementById('maxResBtn')
const ipc = ipcRenderer

//MINIMIZE APP
minimizeBtn.addEventListener('click', () => {
    ipc.send('minimizeApp')
})

//MAXIMIZE RESTORE APP
maxResBtn.addEventListener('click', () => {
    ipc.send('maximizeRestoreApp')
})

ipc.on('isMaximized', () => { changeMaxResBtn(true) })
ipc.on('isRestored', () => { changeMaxResBtn(false) })

function changeMaxResBtn(isMaximizedApp) {
    if (isMaximizedApp) {
        var img = document.getElementById("maxRes");
        img.srcset = "icons/restore-w-10.png 1x, icons/restore-w-12.png 1.25x, icons/restore-w-15.png 1.5x, icons/restore-w-15.png 1.75x, icons/restore-w-20.png 2x, icons/restore-w-20.png 2.25x, icons/restore-w-24.png 2.5x, icons/restore-w-30.png 3x, icons/restore-w-30.png 3.5x";
    } else {
        var img = document.getElementById("maxRes");
        img.srcset = "icons/max-w-10.png 1x, icons/max-w-12.png 1.25x, icons/max-w-15.png 1.5x, icons/max-w-15.png 1.75x, icons/max-w-20.png 2x, icons/max-w-20.png 2.25x, icons/max-w-24.png 2.5x, icons/max-w-30.png 3x, icons/max-w-30.png 3.5x";
    }
}

//CLOSE APP
closeBtn.addEventListener('click', () => {
    ipc.send('closeApp')
})