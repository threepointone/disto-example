import {dis, $} from './$';

export const toggle = dis.register({
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

