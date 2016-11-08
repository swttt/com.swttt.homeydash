"use strict";

var Hapi = require('hapi');
var ip = require('ip');
var Path = require('path');
var Inert = require('inert');

var token = 'da3110b6042fae4bd73713189240fc8c797da0c7';
var server = "";



//app.use('/',express.static(path.join(__dirname, 'web')));



function init() {

	Homey.log("HomeyDash started!");
  Homey.manager('settings').set( 'dashboardRunning', false);

  //If bearer token is set and auto restart is enabled, run te server.
  if(typeof Homey.manager('settings').get( 'dashboardToken' ) !== 'undefined'){
    if(Homey.manager('settings').get( 'dashboardAutostart' ) === true){
      startServer();
    }
  }

}

//'da3110b6042fae4bd73713189240fc8c797da0c7'

function startServer(){


  // app.get('/config.json', function(req, res) {
  //   res.send({homey_ip: ip.address(), homey_api: token, homey_enablespeech: false});
  // });
  // app.use('/',express.static(path.join(__dirname, 'web')));
  // app.use('/bower_components',express.static(path.join(__dirname, 'web/bower_components')));
  // app.use('/styles',express.static(path.join(__dirname, 'web/styles')));
  // app.use('/controllers',express.static(path.join(__dirname, 'web/controllers')));
  server = new Hapi.Server({
      connections: {
          routes: {
              files: {
                  relativeTo: Path.join(__dirname, 'web')
              }
          }
      }
  });



  server.register(Inert, () => {});

  server.connection({ port: 1337 });
  server.route({
    method: 'GET',
    path: '/config.json',
    handler: function (request, reply) {
      reply({homey_ip: ip.address(), homey_api: Homey.manager('settings').get( 'dashboardToken' ), homey_enablespeech: false});
    }
  });

  server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
          directory: {
              path: '.',
              redirectToSlash: true,
              index: true
          }
      }
  });

  server.start(function(err) {
    console.log("Started server!");
    Homey.manager('settings').set( 'dashboardRunning', true);
  })


};

function stopServer(){
  server.stop();
  console.log("Stopped server!");
  Homey.manager('settings').set( 'dashboardRunning', false);
  server = "";
};

module.exports.init = init;
module.exports.startServer = startServer;
module.exports.stopServer = stopServer;
