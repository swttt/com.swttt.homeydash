module.exports = [

    {
        description:		'Get something',
        method: 		'GET',
        path:			'/start',
        fn: function( callback, args ){
            var result = Homey.app.startServer();

            // callback follows ( err, result )
            callback( null, 'Started server' );

            // access /?foo=bar as args.query.foo
        }
    },
    {
        description:		'Get something',
        method: 		'GET',
        path:			'/stop',
        fn: function( callback, args ){
            var result = Homey.app.stopServer();

            // callback follows ( err, result )
            callback( null, 'Stopped server' );

            // access /?foo=bar as args.query.foo
        }
    }
  ]
