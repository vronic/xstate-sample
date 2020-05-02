import { Machine, interpret } from 'xstate';

const LIT_STATE = 'lit';
const UNLIT_STATE = 'unlit';
const BROKEN_STATE = 'broken';

const initial = UNLIT_STATE;

const states = {
  [LIT_STATE]: {
    on: {
      BREAK: BROKEN_STATE,
      TOGGLE: UNLIT_STATE,
    },
  },
  [UNLIT_STATE]: {
    on: {
      BREAK: BROKEN_STATE,
      TOGGLE: LIT_STATE,
    },
  },
  [BROKEN_STATE]: {
    // type: 'final',
  },
};

const config = {
  id: 'lightBulb',
  initial,
  states,
};

const lightBulbMachine = Machine(config);
const service = interpret(lightBulbMachine).start();

service.onTransition((state) => {
  if (state.changed) {
    console.log(state.value);
  }
  // if (state.matches(BROKEN_STATE)) {
  //   console.log('Yo i am broke!');
  // }
});

service.send('TOGGLE');
service.send('TOGGLE');
service.send('BREAK');
service.send('BREAK');
