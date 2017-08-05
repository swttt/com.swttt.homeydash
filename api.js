'use strict';
const Homey = require('homey')

module.exports = [

  {
    method: 'GET',
    path: '/auth',
    fn: function(args, callback) {
      // Check if supplied token matches the stored autkey
      // If they match, get the homeyObject from app.js
      if(args.query.token === Homey.ManagerSettings.get('authkey')){
        console.log('Valid auth!');
        Homey.app.getToken()
          .then(res => callback(null, res))
          .catch(err => callback(err, null))
      }
      else{
        console.log('Invalid auth!')
        callback('Invalid auth token', null)
      }

    }
  }
]
