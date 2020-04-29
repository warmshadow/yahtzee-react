import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { TableRow, TableCell } from "@material-ui/core";

const styles = {
	ruleRowActive: {
		transition: "all 0.2s",
		'&:hover': {
			cursor: "pointer",
			background: "rgba(239, 221, 171, 0.2)",
		}
	},
	ruleRowDisabled: {
		background: "linear-gradient(to right, rgba(224, 217, 197, 0.5) 0%, rgba(138, 113, 110, 0.3) 30%, rgba(224, 217, 197, 0.6) 40%)",
		backgroundSize: "300% 300%",
		animation: "$Slide 1s ease 1",
		'&:hover': {
			cursor: "not-allowed",
		},
		'& TableCell&:first-child': {
			textDecoration: "line-through",
		}
	},
	'@keyframes Slide': {
		"0%": {
			backgroundPosition: "100% 50%"
		},
		"100%": {
			backgroundPosition: "0% 51%"
		}
	},
	ruleRowJoker: {
		background: "red"
	},
	ruleRowNotJoker: {
		background: "yellow"
	},
  ruleRowCell: {
    borderBottom: "1px solid #c7b0ad",
    fontWeight: 300,
    fontSize: "0.85rem",
    padding: "0.15rem 0",
    color: "#3F5258"
  },
  ruleRowCellDisabled: {
  	textDecoration: "line-through",
  	color: "gray"
  }
};

class RuleRow extends Component {
  render() {
  	const {classes, name, score, doScore, descScores, bonusYahtzee, availableJoker} = this.props;
  	const scoreNotUsed = score === undefined;
  	let rowClasses = "";
  	let cellClasses = `${classes.ruleRowCell} `;
  	if (!scoreNotUsed) cellClasses += `${classes.ruleRowCellDisabled}`;

  	if(scoreNotUsed){
  		if(bonusYahtzee) {
  			availableJoker && (rowClasses += `${classes.ruleRowJoker} ${classes.ruleRowActive}`);
  			!availableJoker && (rowClasses += `${classes.ruleRowNotJoker}`);
  		}
  		else {
  			rowClasses += `${classes.ruleRowActive}`;
  		}
  	}
  	else {
  		rowClasses += `${classes.ruleRowDisabled}`;
  	}

    return (
      <TableRow className={rowClasses} onClick={doScore}>
        <TableCell align="left" className={cellClasses}>{name}</TableCell>
        <TableCell align="right" className={classes.ruleRowCell}>{scoreNotUsed ? descScores : score}</TableCell>
      </TableRow>
    )
  }
}

export default withStyles(styles)(RuleRow);