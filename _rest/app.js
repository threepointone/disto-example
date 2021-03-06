'use strict';
// get some dependencies
import React from 'react'; window.React = React;
import imm from 'immutable';
import immumix from 'react-immutable-render-mixin';
import {decorate as mixin} from 'react-mixin';
import autobind from 'autobind-decorator';
import mix from 'disto/mix';

import {$, dis} from './$';

// stores
const list = dis.register(imm.fromJS({
  loading: false,
  query: '',
  results: [],
  selected: false
}), (o, action, ...args) => {
  switch(action){

    case $.search:
      let [query] = args;
      return o.merge(imm.fromJS({
        selected: false,
        loading: true,
        query: query,
        error: null
      }));

    case $.search.done:
      const [err, res] = args;
      return (err || res.error) ?
        o.merge(imm.fromJS({
          loading: false,
          results: [],
          error: err || res.error
        })) :
        o.merge(imm.fromJS({
          loading: false,
          results: res.body.data.results.products,
          error: null
        }));

    case $.select:
      let [id] = args;
      return o.merge(imm.fromJS({
        selected: id
      }));

    case $.backToList:
       return o.merge(imm.fromJS({
        selected: null
      }));

    default:
      return o;
  }
}, imm.is);

const details = dis.register(imm.fromJS({
  loading: false,
  query: '',
  results: []
}), (o, action, ...args) => {
  switch(action){

    case $.details:
      let [id] = args;

      return o.merge(imm.fromJS({
        loading: true, id,
        details: null,
        error: null
      }));

    case $.details.done:
      const [err, res] = args;
      return (err || res.error) ?
        o.merge(imm.fromJS({
          loading: false,
          details: [],
          error: err || res.error})) :
        o.merge(imm.fromJS({
          loading: false,
          details: res.body.data,
          error: null
        }));

    default:
      return o;
  }
}, imm.is);


@mixin(immumix)
@mixin(mix)
export class App extends React.Component {
  observe(){
    return {
      list,
      details
    };
  }
  render() {
    return <Search {...this.state.data} />;
  }
}


function vis(bool){
  return bool ? {} : {display: 'none'};
}

@mixin(immumix)
class Search extends React.Component {
  sender(fn){
    return function(){
      this.send(fn, ...arguments);
    };
  }
  onChange(e){
    $.search(e.target.value);
  }
  render() {
    var props = this.props,
      selected = props.list.get('selected');

    return (
      <div className="Search">
        <input value={props.list.get('query')} onChange={e => this.onChange(e)}/>
        <Results {...props} style={vis(!selected)}/>
        <Details key={props.details.get('id')} {...props} style={vis(!!selected)}/>
      </div>
    );
  }
}



@mixin(immumix)
class Results extends React.Component {
  render() {
    return (
      <div className="Results" style={this.props.style}>
        {this.props.list.get('results').map(item => <Result product={item} key={item.get('styleid')}/>)}
      </div>
    );
  }
}

@mixin(immumix)
class Result extends React.Component {
  @autobind
  onClick(){
    $.select(this.props.product.get('styleid'));
  }
  render() {
    const props = this.props;
    return (
      <div className="Result" onClick={this.onClick} style={{width: 200, display: 'inline-block'}}>
        <span>{props.product.get('product')}</span>
        <img key={Date.now()} src={props.product.get('search_image')} style={{maxWidth: 200}}/>
      </div>
    );
  }
}


@mixin(immumix)
class Details extends React.Component {
  render() {
    const props = this.props;
    return (
      <div className='Details-cnt' style={props.style}>
        <span style={{cursor: 'pointer'}} onClick={$.backToList}>back to list page</span>
        {props.details.get('loading') ?
          <span>loading...</span> :
          <div className="Details">
            <img src={props.details.getIn('details.styleImages.default.imageURL'.split('.'))} style={{maxWidth: 200}}/>
            <span>{props.details.getIn('details.productDisplayName'.split('.'))}</span>
          </div>}
      </div>
    );
  }
}

