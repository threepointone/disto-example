// record / replay
// based on the the api from https://github.com/goatslacker/alt/blob/master/src/utils/DispatcherRecorder.js

// in your console,
// $$$.record() to start recording
// $$$.stop() to stop recording
// $$$.play() to replay the session

// todo - match timestamps, to be more realistic?

let {act} = require('disto');
let {dis} = require('./$');


function timeout(t){
  return new Promise(resolve => setTimeout(()=> resolve(), t));
}

let $$ = act(dis.dispatch, {
  record: '',
  stop: '',
  play: async function(){
    for(var [action, args] of store.get().actions){
      await timeout(100);
      dis.dispatch(action, ...args);
    }
  }
});




$$.log = () => console.log(store.get());

var register = dis.register;
var regi = register; // slip by disto-hot :S
dis.register = (initial, reduce, compare) => {
  var state;
  return regi(initial, function(o, action, ...args){
    switch(action){
      case $$.record:
        state = o;
        return o;

      case $$.play:
        return state;
    }
    return reduce(o, action, ...args);

  }, compare);
};

var store = register({
  recording: false,
  playing: false,
  actions: []
}, (o, action, ...args) => {
  switch(action){
    case $$.record:
      return {...o,
        recording: true,
        actions: []
      };

    case $$.stop:
      return {...o,
        recording: false
      };

    case $$.play:
      return {...o,
        playing: true
      };

    case $$.play.done:
      console.log('done replaying');
      return {...o,
        playing: false
      };

    default: return o.recording ? {
      ...o,
      actions: o.actions.concat([[action, args]])
    } : o;
  }

});

global.$$$ = $$;