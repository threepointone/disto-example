import React from 'react';
window.React = React;

// disto
const {Dis, act} = require('disto');
import mix from 'disto/mix';

// make a new dispatcher
const {dispatch, register} = new Dis();

// actions
export const $ = act(dispatch, {
  tick: () => toggle.get().active && setTimeout($.tick, 10),
  toggle: () => $.tick()
});

// stores
export const tick = register({
  soFar: 0,
  ticks: 0,
  start: Date.now()
}, (o, action) => {
  switch(action){
    case $.tick:
      return {
        ...o,
        soFar: (Date.now() - o.start),
        ticks: o.ticks + 1
      };
    default:
      return o;
  }
});

export const toggle = register({
  active: false,
  times: 0
}, (o, action) => {
  switch(action){
    case $.toggle:
      return {
        ...o,
        active: !o.active,
        times: o.times + 1
      };
    default:
      return o;
  }
});


// views
export const App = React.createClass({
  mixins: [mix],
  getDefaultProps() {
    return { tick, toggle };
  },
  observe(props){
    return props;
  },
  render() {
    var data = this.state.data;
    return (
      <div className="App">
        <div>times: {data.tick.soFar} </div>
        <button onClick={() => $.toggle()}/>
        <div>clicks: {data.toggle.times} </div>
        <div>{data.tick.x || 'nothing'}</div>
      </div>
    );
  }
});


React.render(<App/>, document.getElementById('container'));
