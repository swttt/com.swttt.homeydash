'use strict';
const Homey = require('homey')

module.exports = [

  {
    method: 'GET',
    path: '/auth',
    fn: function(args, callback) {

      
      Homey.app.getDevices().then(res => {
          callback(null, res);
        })
        .catch(error => callback(error, null));

    }
  }
]
