import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import withWidth from '@material-ui/core/withWidth';

const styles = {
	Die: {
		color: "white",
		// color: "#ebeae9",
		cursor: "pointer",
		filter: "drop-shadow(0 19px 10px rgba(0, 0, 0, 0.3)) drop-shadow(0 15px 10px rgba(0, 0, 0, 0.1))",
		transition: "all 0.3s ease",
		'&:hover': {
			opacity: 0.8
		}
	},
	DieLocked: {
		opacity: 0.5,
  	filter: "none",
  	'&:hover': {
  		opacity: 0.5
  	}
	},
	DieDisabled: {
		cursor: "not-allowed"
	},
	DieRolling: {
		animation: "$spin 1s ease-out"
	},
	'@keyframes spin': {
		"0%": {
			transform: "rotate(0deg)"
		},
		"100%": {
			transform: "rotate(360deg)"
		}
	}
}

class Die extends Component {
	handleClick = (evt) => {
    this.props.handleClick(this.props.idx);
  }

	render(){
		const {locked, rolling, side, disabled, classes} = this.props;
		let iconClasses = classes.Die;
		if (locked) iconClasses = clsx(iconClasses, classes.DieLocked);
		if (rolling) iconClasses = clsx(iconClasses, classes.DieRolling);
		if (disabled) iconClasses = clsx(iconClasses, classes.DieDisabled);
		const iconSize = this.props.width === 'xs' ? '3x' : '4x';
		return(
			<FontAwesomeIcon 
				icon={side} 
				size={iconSize}
				className={iconClasses}
				onClick={this.handleClick}
				disabled={disabled}
			/>
		);
	}
}

export default withStyles(styles)(withWidth()(Die));