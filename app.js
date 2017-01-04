"use strict";

var Hapi = require('hapi');
var ip = require('ip');
var Path = require('path');
var Inert = require('inert');


var server = "";
var config = {};






function init() {
    // Start with running state on false
    Homey.manager('settings').set('dashboardRunning', false);

    Homey.log("HomeyDash started!");
    // Check if settings excists
    if (Homey.manager('settings').get('config')) {
        config = Homey.manager('settings').get('config');
        console.log('Config found!');
        console.log(config);

        //If autostart is true, run server.
        if (Homey.manager('settings').get('config').autostart === true) {
            console.log('autostart found!')
            startServer();
        }
    }


}

Homey.manager('settings').on('set', function(setting) {
    if (setting == 'config') {
        console.log('New config settings!')
        config = Homey.manager('settings').get('config');
        Homey.manager('cloud').getLocalAddress(function(err, result) {
            config.homeyip = result.slice(0, -3);
            console.log('ip found! ' + config.homeyip);
        });

        if (!config.pages) {
            config.pages = {};
        }
        if (!config.general) {
            config.general = {};
        }
        console.log(config);
    }
});

function startServer() {

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
    console.log(newconfig);




};

function currentIp() {
    return config.homeyip;
};



module.exports.init = init;
module.exports.startServer = startServer;
module.exports.stopServer = stopServer;
module.exports.saveNewSettings = saveNewSettings;
module.exports.currentIp = currentIp;
