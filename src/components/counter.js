import React, { Component } from 'react';

class Counter extends Component {
	constructor(){
		super();
		this.state = {
			clicks : 0
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		this.setState({
			clicks: this.state.clicks + 1
		})
	}
	render(){
		return (
			<button onClick={ this.handleClick }>{ this.state.clicks }</button>
		)
	}
}

export default Counter;