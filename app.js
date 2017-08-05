'use strict';

const Homey = require('homey');

const randomize = require('randomatic');

class HomeydashApp extends Homey.App {

	onInit() {

		this.log('Homeydash is running...');
    if(!Homey.ManagerSettings.get('authkey')){
      this.error('No authkey found!')
      Homey.ManagerSettings.set('authkey', randomize('A0', 6))
    }
	}

  getToken(){
    
  }

}

module.exports = HomeydashApp;
