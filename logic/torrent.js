const torrentStream = require('torrent-stream')
const fs = require('fs')
var express = require('express');
var request = require('request').defaults({encoding: null});
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var os = require('os');
var del = require('del');
var mime = require('mime');
var archiver = require('archiver');
let filename
app.use(express.static(__dirname + '/public'));
var DIR = os.tmpdir()+'/torrent-web-poc';



var write = fs.createWriteStream(__dirname + `/spiderman.mp4`)

function torStream(magLink) {
  var engine = torrentStream(magLink, {
		 uploads: 3,
		 connections: 30,
		 path: DIR
	 })
	engine.on('ready', () => {
	 engine.files.forEach(async (file) => {
		 if (file.name.endsWith('.mp4')) {
			 console.log('filename:', file.name);
			 var stream = file.createReadStream()
		     return stream;
		 }
	 })
	})
}

module.exports = {
  torStream
}
