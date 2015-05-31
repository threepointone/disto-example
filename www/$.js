let disto = require('disto');
let {Dis, act} = disto;

export let dis = new Dis();
// make a new dispatcher
let {dispatch} = dis;

// actions
export const $ = act(dispatch, {
  tick: ()=>{
    if(require('./toggle').toggle.get().active){
      setTimeout(() => $.tick(), 100);
    }
  },
  toggle: () => {
    $.tick();
  }
});
