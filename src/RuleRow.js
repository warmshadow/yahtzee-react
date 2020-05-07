import React, { Component } from 'react';
import { TableRow, TableCell } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

const styles = {
	rowActive: {
		transition: "all 0.2s",
		'&:hover': {
			cursor: "pointer",
			background: "rgba(239, 221, 171, 0.2)",
		}
	},
	rowDisabled: {
		background: "linear-gradient(to right, rgba(224, 217, 197, 0.5) 0%, rgba(138, 113, 110, 0.3) 30%, rgba(224, 217, 197, 0.6) 40%)",
		backgroundSize: "300% 300%",
		animation: "$Slide 1s ease 1",
		'&:hover': {
			cursor: "not-allowed"
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
	rowJoker: {
		animation: "$Blink 1.5s ease infinite",
    '&:hover': {
      background: "rgba(148, 98, 91, 0.9)"
    }
	},
  '@keyframes Blink': {
    "50%": {
      background: "rgba(148, 98, 91, 0.6)"
    }
  },
	rowNotJoker: {
    opacity: "0.5",
    cursor: "not-allowed"
	},
  cell: {
    borderBottom: "1px solid #c7b0ad",
    padding: "0.15rem 0",
    fontWeight: 300,
    fontSize: "0.85rem",
    color: "#3F5258"
  },
  cellDisabled: {
  	textDecoration: "line-through",
  	color: "gray"
  }
};

class RuleRow extends Component {
  render() {
  	const {classes, name, score, doScore, descScores, bonusYahtzee, availableJoker} = this.props;
  	const scoreNotUsed = score === undefined;
    const leftCellClasses = clsx(classes.cell, {[classes.cellDisabled]: !scoreNotUsed});
  	let rowClasses;
    if(scoreNotUsed) {
      if(bonusYahtzee) {
        //when bonus yahtzee highlight only those allowed to score
        rowClasses = clsx({
          [classes.rowActive]: availableJoker,
          [classes.rowJoker]: availableJoker,
          [classes.rowNotJoker]: !availableJoker
        });
      }
      else { 
        rowClasses = clsx(classes.rowActive); 
      }
    }
    else { rowClasses = clsx(classes.rowDisabled); }
    return (
      <TableRow className={rowClasses} onClick={doScore}>
        <TableCell align="left" className={leftCellClasses}>{name}</TableCell>
        <TableCell align="right" className={classes.cell}>{scoreNotUsed ? descScores : score}</TableCell>
      </TableRow>
    )
  }
}

export default withStyles(styles)(RuleRow);