import React, { Component, PropTypes } from 'react';
import { extractTimeParts } from '../lib/utils';
//Definir un componente de forma funcional proque es estatico, es decir no cambia o recibe props
const Header = () => (
	<div className="header">
		      <h2>Cronómetro</h2>
    </div>
);

const Buttons = (props) => (
	<div className="actions">
        <button onClick={ props.onStop }>STOP</button>
        <button onClick={ props.onStart }>START</button>
  	</div>
)

Buttons.propTypes = {
	onStart : PropTypes.func,
	onStop : PropTypes.func
};

const Screen = (props) => (
	<div className="timer">
        <span className="timer-m">{ props.minutes}:</span>
        <span className="timer-s">{ props.seconds}:</span>
        <span className="timer-ms">{ props.milliseconds }</span>
    </div>
)
class Cronometro extends Component {
	constructor(){
		super()
		this.state = {
			isRunning: false,
			start: 0,
			current:0
		}
		//Al usar es6 no se dispone del auto-binding, por lo tanto es necesario establecer el contexto de this el
		//constructor
		this.handleStart = this.handleStart.bind(this);
		this.handleStop = this.handleStop.bind(this);
	}
	handleStart(){
		if(this.state.isRunning){
			return
		}

		this.setState({
			isRunning: true,
			start: Date.now(),
			current: Date.now()
		});

		this._internval = setInterval(() => {
			this.setState({
				current: Date.now()
			})
		}, 100)
	}
	handleStop(){
		if(this.state.isRunning){
			//detner
			clearInterval(this._internval);
			this.setState({
				isRunning : false
			})
		}else{
			//poner a cero
			this.setState({
				start: 0,
				current: 0
			})
		}
	}
	render(){
		const { start, current } = this.state;
		const { minutes, seconds, milliseconds } = extractTimeParts(current-start);
		return(
			<div className="crono">
				<Header />
		    	<div className="content">
			      <Screen
							minutes={ minutes }
							seconds={ seconds }
							milliseconds={ milliseconds } />
			      <Buttons
							onStart={ this.handleStart }
							onStop={ this.handleStop }/>
			    </div>
	  		</div>
		)
	}
}

export default Cronometro;
