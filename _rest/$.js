let {act, Dis} = require('disto');
import {services} from './svc';
export const dis = new Dis();

// run this before attaching any other stores
// needs to be exactly like thos to satify disto-hot
import * as r from 'disto/lib/record';
let rStore = dis.register(r.initial, r.reduce, r.compare);
r.setup(dis, rStore);

// declare actions
export const $ = act(dis.dispatch, {
  init: () => services.config($.init.done), // load config,
  search: query => services.search(query, $.search.done),
  details: id => services.details(id, $.details.done),
  select: id => $.details(id),
  backToList: ''
}, 'dev');
// ... that's it. most of the 'logic' is in the stores.
