"use strict";








function init() {

    Homey.log("HomeyDash started!");

    if (!Homey.manager('settings').get('config')) {
        var newConfig = {
            "bearertoken": "",
            "general": {
                "hidesidebar": false,
                "defaultpage": false,
                "hidekwh": true,
                "idletime": 5
            },
            "pages": []
        }

        Homey.manager('settings').set('config', newConfig);

    }


}

// Homey.manager('settings').on('set', function(setting) {
//     if (setting == 'config') {
//         console.log('New config settings!')
//         config = Homey.manager('settings').get('config');
//         Homey.manager('cloud').getLocalAddress(function(err, result) {
//             config.homeyip = result.slice(0, -3);
//             console.log('ip found! ' + config.homeyip);
//         });
//
//         if (!config.pages) {
//             config.pages = {};
//         }
//         if (!config.general) {
//             config.general = {};
//         }
//         console.log(config);
//     }
// });


function saveNewSettings(newconfig) {
    Homey.manager('settings').set('config', newconfig);
}


function getConfig() {
    return Homey.manager('settings').get('config');
}



module.exports.init = init;

module.exports.saveNewSettings = saveNewSettings;
module.exports.getConfig = getConfig;
