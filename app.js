'use strict';

const Homey = require('homey');

const { HomeyAPI } = require('./lib/athom-api.js')

const randomize = require('randomatic');

class HomeydashApp extends Homey.App {

	onInit() {

		this.log('Homeydash is running...');

    // Check if random auth key excists in settings
    // If not, generate a new one
    if(!Homey.ManagerSettings.get('authkey')){
      this.error('No authkey found!')
      Homey.ManagerSettings.set('authkey', randomize('A0', 6))
    }
	}

  // Get the homeyObject needed to auth with athom-api
  async getToken(){
    try{
      const homeyObject = await HomeyAPI.forCurrentHomey();
      return homeyObject;
    }
    catch(err){
      this.error(err);
    }
  }

}

module.exports = HomeydashApp;
