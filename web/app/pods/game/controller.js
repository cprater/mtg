import Ember from 'ember';

export default Ember.Controller.extend({
  socketService: Ember.inject.service('websockets'),

  init() {
    const socket = this.get('socketService').socketFor('ws://localhost.com:3000/');
    socket.on('open', this.myOpenHandler, this);
    socket.on('close', this.myCloseHandler, this);
  },

  myOpenHandler(event) {
    console.log(`On open event has been called: ${event}`);
  },

  myCloseHandler(event) {
    console.log(`On open event has been called: ${event}`);
  }

});
