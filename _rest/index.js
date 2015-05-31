import 'babel/polyfill';
import React from 'react';
import {$} from './$';
import {App} from './app.js';

function main(){
  $.init();
  React.render(<App/>, document.getElementById('container'));
}

main();


