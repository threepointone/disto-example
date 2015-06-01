import request from 'superagent';

function toPromise(fn){
  return new Promise((resolve, reject) => fn((err, res) => err ? reject(err) : resolve(res)));
}

// a couple of helpers to fetch data
export const services = {
  search(query){
    return toPromise(done => request(`http://localhost:3142/list/${query}?rows=20`).end(done));
  },
  details(id){
    return toPromise(done => request(`http://localhost:3142/product/${id}`).end(done));
  },
  config(){
    // fake fetching some async config
    return toPromise(done => setTimeout(() =>
      done(null, {configObj: {x: 1}}),
    Math.random() * 500));
  }
};
