import 'babel/polyfill';
import React from 'react';
import {$, dis} from './$';
import {App} from './app.js';

function main(){
  $.init();
  React.render(<App/>, document.getElementById('container'));
  window.dis = dis;
}

main();


