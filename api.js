module.exports = [

    {
        description: 'Save new settings',
        method: 'POST',
        path: '/savesettings',
        fn: function(callback, args) {
            var result = Homey.app.saveNewSettings(args.body);

            // callback follows ( err, result )
            callback(null, 'Saved settings');

            // access /?foo=bar as args.query.foo
        }
    }, {
        description: 'Get config.json',
        method: 'GET',
        path: '/config.json',
        fn: function(callback, args) {
            var result = Homey.app.getConfig();

            // callback follows ( err, result )
            callback(null, result);

            // access /?foo=bar as args.query.foo
        }
    }
]
