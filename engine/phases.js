import StateMachine from './vendor/state-machine';

/*
fsm.current - contains the current state
fsm.is(s) - return true if state s is the current state
fsm.can(e) - return true if event e can be fired in the current state
fsm.cannot(e) - return true if event e cannot be fired in the current state
fsm.transitions() - return list of events that are allowed from the current state
*/

const fsm = StateMachine.create({
  initial: 'beginning',

  events: [
    { name: 'beginning', from: ['end', 'cleanup'], to: 'uptap' },
    { name: 'untap', from: 'beginning', to: 'upkeep' },
    { name: 'upkeep', from: 'untap', to: 'draw' },
    { name: 'draw', from: 'upkeep', to: 'preAttackMain' },
    { name: 'preAttackMain', from: 'draw', to: 'combatPhase' },
    { name: 'combatPhase', from: 'pre-attack-main', to: 'beginningCombat' },
    { name: 'beginningCombat', from: 'combat-phase', to: 'declareAttackers' },
    { name: 'declareAttackers', from: 'beginningCombat', to: 'declareBlockers' },
    { name: 'declareBlockers', from: 'declareAttackers', to: 'damage' },
    { name: 'damage', from: 'declareBlockers', to: 'endCombat' },
    { name: 'end-combat', from: 'damage', to: 'postAttackMain' },
    { name: 'postAttackMain', from: 'endCombat', to: 'end' },
    { name: 'end', from: 'postAttackMain', to: 'end' },
    { name: 'cleanup', from: 'end', to: 'beginning' }
  ],

  callbacks: {
    onbeforeuntap() {

    },

    onenteruntap() {
      // go through all cards and call untap()
      const triggers = game.permenants.map( permenant => permenant.untap() ).filter(p => p);

      // send triggers to the client so that players can choose order

      socket.send(JSON.stringify({ type: 'order-triggers', triggers }));

      socket.on('message', function() {
        fsm.transition();
      });

      return StateMachine.ASYNC;
    },
  }
});

export default fsm;
