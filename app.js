"use strict";

var express = require('express');
var app = express();
var path = require('path');



app.listen(1337, function () {
  console.log('Example app listening on port 1337!')
});
app.use('/',express.static(path.join(__dirname, 'web')));
app.use('/bower_components',express.static(path.join(__dirname, 'web/bower_components')));
app.use('/styles',express.static(path.join(__dirname, 'web/styles')));
app.use('/controllers',express.static(path.join(__dirname, 'web/controllers')));

function init() {

	Homey.log("Hello world!");

}

module.exports.init = init;
