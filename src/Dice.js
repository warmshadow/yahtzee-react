import React, { Component } from 'react';
import { Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Die from "./Die.js";
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons';

const styles = {
	dice: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem"
	}
}

class Dice extends Component {
	static defaultProps = {
		sides: {
			1: faDiceOne,
			2: faDiceTwo,
			3: faDiceThree,
			4: faDiceFour,
			5: faDiceFive,
			6: faDiceSix
		}
	}

	render(){
		const {classes, dice, sides, locked, disabled, rolling, handleClick} = this.props;
		return (
			<Box className={classes.dice}>
				{dice.map((d, idx) =>
	        <Die 
	        	handleClick={handleClick}
	          val={d}
	          side={sides[d]}
	          locked={locked[idx]}
	          disabled={disabled}
	          rolling={rolling && !locked[idx]}
	          idx={idx}
	          key={idx} 
	        />
      	)}
			</Box>
		);
	}
}

export default withStyles(styles)(Dice);