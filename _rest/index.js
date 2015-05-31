import React from 'react';
import {$, App} from './app.js';

function main(){
  $.init();
  React.render(<App/>, document.getElementById('container'));
}

main();


