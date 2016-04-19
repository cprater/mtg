import StateMachine from '../';

const FSM = StateMachine.create({
  initial: 'open',

  events: [
    { name: 'open', from: null, to: 'inProgress' },
    { name: 'inProgress', from: 'open', to: 'finished' },
    { name: 'finished', from: 'inProgress', to: null }
  ]
});

class Room {
  constructor(creatorId, gameType = 'modern') {
    super();

    this.createdAt = Date.now();
    this.settings.maxPlayers = 2;
    this.settings.gameType = gameType;
    this.players = [creatorId];

    this.gameState = FSM;
  }

  addPlayer(playerId) {
    this.players.push(playerId);

    if (this.players.length === this.settings.maxPlayers) {
      this.gameState.inProgress();
    }
  }

  removePlayer(player) {
    this.players = this.players.filter(p => p !== player);
  }
}

export default Room;
