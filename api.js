module.exports = [

    {
        description: 'Start server',
        method: 'POST',
        path: '/start',
        fn: function(callback, args) {
            var result = Homey.app.startServer();

            // callback follows ( err, result )
            callback(null, 'Started server');

            // access /?foo=bar as args.query.foo
        }
    }, {
        description: 'Stop server',
        method: 'POST',
        path: '/stop',
        fn: function(callback, args) {
            var result = Homey.app.stopServer();

            // callback follows ( err, result )
            callback(null, 'Stopped server');

            // access /?foo=bar as args.query.foo
        }
    }, {
        description: 'Save new settings',
        method: 'POST',
        path: '/savesettings',
        fn: function(callback, args) {
            var result = Homey.app.saveNewSettings(args.body);

            // callback follows ( err, result )
            callback(null, 'Saved settings');

            // access /?foo=bar as args.query.foo
        }
    }
]
