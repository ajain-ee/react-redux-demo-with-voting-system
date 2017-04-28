import React from 'react';
import {List, Map} from 'immutable';

export default class App extends React.Component{
  render(){
 	console.log("App Component", this.props.children);
    return (
    	this.props.children
    )};
};