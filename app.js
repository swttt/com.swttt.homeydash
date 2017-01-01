"use strict";

var Hapi = require('hapi');
var ip = require('ip');
var Path = require('path');
var Inert = require('inert');

//var token = '';
var server = "";
var config = {};



//app.use('/',express.static(path.join(__dirname, 'web')));



function init() {

    Homey.log("HomeyDash started!");

    if (Homey.manager('settings').get('config') !== undefined) {
        config = Homey.manager('settings').get('config');
        config.homeyip = ip.address();
        config.pages = {};
        console.log('Config found!');
        console.log(config);
    }


    Homey.manager('settings').set('dashboardRunning', false);

    //If bearer token is set and auto restart is enabled, run te server.
    if (typeof config.bearertoken !== undefined) {
        if (config.autostart === true) {
            startServer();
        }
    }


}

Homey.manager('settings').on('set', function(setting) {
    if (setting == 'config') {
        console.log('New config settings!')
        config = Homey.manager('settings').get('config');
        config.homeyip = ip.address();
        config.pages = {};
        console.log(config);
    }
});

function startServer() {

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

    server.connection({
        port: 1337
    });
    server.route({
        method: 'GET',
        path: '/config.json',
        handler: function(request, reply) {
            reply(config);
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
        Homey.manager('settings').set('dashboardRunning', true);
    })


};

function stopServer() {
    server.stop();
    console.log("Stopped server!");
    Homey.manager('settings').set('dashboardRunning', false);
    server = "";
};

function saveNewSettings(newconfig) {
    config = newconfig;
    Homey.manager('settings').set('config', newconfig);
    console.log('New settings!');
    console.log(config);




};


module.exports.init = init;
module.exports.startServer = startServer;
module.exports.stopServer = stopServer;
module.exports.saveNewSettings = saveNewSettings;
