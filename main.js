const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const express = require('express')

var server = express()

let win
var conf

var code
var hash
var number

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

 server.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    next();
});

server.get('/send', function(req, res) {

    code = req.query.code
    hash = req.query.hash
    number = req.query.number

    win.loadURL(url.format ({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
     }))
})

server.get('/getcode', function(req, res) {

    res.send(code)
})

server.get('/gethash', function(req, res) {

  res.send(hash)
})

server.get('/getnumber', function(req, res) {

  res.send(number)
})

server.get('/test', function(req, res) {

    res.send('Working...')
})

server.listen('8080', function(){})

}
app.on('ready', createWindow)
