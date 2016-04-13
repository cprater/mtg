import PhaseStateMachine from './phases';
import StateMachine from '../';

const FSM = StateMachine.create({
  initial: 'open',

  events: [
    { name: 'open', from: null, to: 'confirmation' },
    { name: 'confirmation', from: 'open', to: 'inProgress' },
    { name: 'inProgress', from: 'confirmation', to: 'finished' },
    { name: 'finished', from: 'inProgress', to: null }
  ],

  callbacks: {
    onpanic:  function(event, from, to, msg) { alert('panic! ' + msg); },
  }
});


class Game {
  // players: [],
  // hands: [],
  // graveyards: [],
  // battlefields: [],
  // stack: [],
  // exiles: [],
  // libraries: [],


  //settings: {}

  constructor() {
    super();

    this.settings.maxPlayers = 2;
    this.settings.teamTime = 25;

    this.gameState = FSM;
  }

  addPlayer(player) {
    this.players.push(player);

    if (this.players.length === this.settings.maxPlayers) {
      FSM.inProgress();
    }
  }

  removePlayer(player) {
    this.players = this.players.filter(p => p !== player);
  }
}

export default Game;

/*
  const game = new Game({ totalPlayers: 2, totalTime: 50 })

  game.addPlayer();
  game.addPlayer();

  game.start()

*/
