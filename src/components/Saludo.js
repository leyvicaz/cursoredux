import React, { Component, PropTypes } from 'react';

class Saludo extends Component {
	render(){
		const { text, user:{nombre, apellido} } = this.props;
		return (
			<div>{ text },  { nombre + ' ' + apellido }</div>
		)
	}
}

Saludo.propTypes = {
	text : PropTypes.string,
	user : PropTypes.shape({
		nombre : PropTypes.string,
		appelido : PropTypes.string
	})
}

export default Saludo;