const {app, BrowserWindow} = require('electron') 
const url = require('url') 
const path = require('path')  
const watchr = require('watchr')

let win  
//var path = process.cwd()

function createWindow() { 
   win = new BrowserWindow({width: 800, height: 600}) 
   win.setMenu(null);
   /*
   win.loadURL(url.format ({ 
      pathname: path.join(__dirname, 'index.html'), 
      protocol: 'file:', 
      slashes: true 
   }))
   */

   win.loadURL(url.format ({ 
    pathname: path.join(__dirname, 'dialog.html'), 
    protocol: 'file:', 
    slashes: true 
 })) 
 
} 
/*
function listener (changeType, fullPath, currentStat, previousStat) {
	switch ( changeType ) {
		case 'update':
			console.log('the file', fullPath, 'was updated', currentStat, previousStat)
			break
		case 'create':
			console.log('the file', fullPath, 'was created', currentStat)
			break
		case 'delete':
			console.log('the file', fullPath, 'was deleted', previousStat)
			break
	}
}
*/
/*
function next (err) {
	if ( err )  return console.log('watch failed on', path, 'with error', err)
	console.log('watch successful on', path)
}

// Watch the path with the change listener and completion callback
var stalker = watchr.open(path, listener, next)

// Close the stalker of the watcher
stalker.close()
*/
app.on('ready', createWindow)
