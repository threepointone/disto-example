import request from 'superagent';

// a couple of helpers to fetch data
export const services = {
  search(query, callback){
    return request(`http://localhost:3142/list/${query}?rows=20`).end(callback);
  },
  details(id, callback){
    return request(`http://localhost:3142/product/${id}`).end(callback);
  },
  config(callback){
    // fake fetching some async config
    setTimeout(()=> {
      callback(null, {configObj: {x: 1}});
    }, Math.random() * 500);
  }
};
