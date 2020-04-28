import React, { Component } from 'react';
import { Box, Typography, Table, TableBody } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import RuleRow from "./RuleRow";
import { ones, twos, threes, fours, fives, sixes, threeOfKind, fourOfKind, fullHouse, smallStraight, largeStraight, yahtzee, chance } from './Rules';

const styles = {
  scoreTable: {
    //backgroundColor: "white",
  },
  scoreTableTitle: {
  	padding: "1rem 0",
  	color: "#485570",
  	fontWeight: 300,
  	fontStyle: "italic",
  },
  scoreTableTotal: {
  	padding: "1rem 0 0",
  	display: "inline-block",
  	borderBottom: "1px solid darkgray",
  	color: "#95625A"
  },
  scoreTableHiScore: {
  	paddingTop: "0.3rem",
  	paddingBottom: "1.2rem",
  	fontWeight: 300,
  	fontStyle: "italic",
  	textTransform: "uppercase",
  	color: "#737F7C",
  	fontSize: "1.1rem"
  }
};

class ScoreTable extends Component {
	static defaultProps = {
    descScores: {
      ones: "1 point per 1",
      twos: "2 points per 2",
      threes: "3 points per 3",
      fours: "4 points per 4",
      fives: "5 points per 5",
      sixes: "6 points per 6",
      threeOfKind: "Sum all dice if 3 are the same",
      fourOfKind: "Sum all dice if 4 are the same",
      fullHouse: "25 points for a full house",
      smallStraight: "30 points for a small straight",
      largeStraight: "40 points for a large straight",
      yahtzee: "50 points for yahtzee",
      chance: "Sum of all dice",
    }
  }

  checkForUpperBonus(){
  	const upperScores = Object.values(this.props.scores).slice(0,6);
  	const filled = upperScores.every(score => score !== undefined);
  	if (filled) {
  		const totalUpper = upperScores.reduce((total, curValue) => total + curValue);
  		totalUpper >= 63 ? console.log("BONUSAS") : console.log("NO BONUS");
  	}
  	// console.log(filled);
  }

  getTotalScore(){
    const {scores} = this.props;
    let totalScore = 0;
    for(let key in scores){
      if(scores[key]) totalScore += scores[key];
    }
    return totalScore;
  }

  setHighScore(curHighScore){
    const curTotal = this.getTotalScore();
    (curTotal > curHighScore) && localStorage.setItem("highScore", curTotal);
  }

	render(){
		const { classes } = this.props;
		const { descScores, scores, doScore, gameOver } = this.props;
		const high_score = localStorage.getItem("highScore");
		gameOver && this.setHighScore(high_score)
		this.checkForUpperBonus();
		// console.log("scoretable render");
		return(
      <Box className={classes.scoreTable}>
        <Box component="section" px="1rem">
          <Typography variant="h5" className={classes.scoreTableTitle}>Upper</Typography>
	        <Table padding="none">
	          <TableBody>
	            <RuleRow name="Ones" score={scores.ones} doScore={evt => doScore("ones", ones.evalRoll)} descScores={descScores.ones} />
	            <RuleRow name="Twos" score={scores.twos} doScore={evt => doScore("twos", twos.evalRoll)} descScores={descScores.twos} />
	            <RuleRow name="Threes" score={scores.threes} doScore={evt => doScore("threes", threes.evalRoll)} descScores={descScores.threes} />
	            <RuleRow name="Fours" score={scores.fours} doScore={evt => doScore("fours", fours.evalRoll)} descScores={descScores.fours} />
	            <RuleRow name="Fives" score={scores.fives} doScore={evt => doScore("fives", fives.evalRoll)} descScores={descScores.fives} />
	            <RuleRow name="Sixes" score={scores.sixes} doScore={evt => doScore("sixes", sixes.evalRoll)} descScores={descScores.sixes} />
	          </TableBody>
	        </Table>
        </Box>
        <Box component="section" px="1rem">
        	<Typography variant="h5" className={classes.scoreTableTitle}>Lower</Typography>
        	<Table padding="none">
        		<TableBody>
        		  <RuleRow name="Three of Kind" score={scores.threeOfKind} doScore={evt => doScore("threeOfKind", threeOfKind.evalRoll)} descScores={descScores.threeOfKind} />
              <RuleRow name="Four of Kind" score={scores.fourOfKind} doScore={evt => doScore("fourOfKind", fourOfKind.evalRoll)} descScores={descScores.fourOfKind} />
              <RuleRow name="Full House" score={scores.fullHouse} doScore={evt => doScore("fullHouse", fullHouse.evalRoll)} descScores={descScores.fullHouse} />
              <RuleRow name="Small Straight" score={scores.smallStraight} doScore={evt => doScore("smallStraight", smallStraight.evalRoll)} descScores={descScores.smallStraight} />
              <RuleRow name="Large Straight" score={scores.largeStraight} doScore={evt => doScore("largeStraight", largeStraight.evalRoll)} descScores={descScores.largeStraight} />
              <RuleRow name="Yahtzee" score={scores.yahtzee} doScore={evt => doScore("yahtzee", yahtzee.evalRoll)} descScores={descScores.yahtzee} />
              <RuleRow name="Chance" score={scores.chance} doScore={evt => doScore("chance", chance.evalRoll)} descScores={descScores.chance} />
        		</TableBody>
        	</Table>
        </Box>
        <Typography variant="h5" className={classes.scoreTableTotal}>TOTAL SCORE: {this.getTotalScore()}</Typography>
        <Typography variant="h6" className={classes.scoreTableHiScore}>High Score: {high_score}</Typography>
      </Box>
		);
	}
}

export default withStyles(styles)(ScoreTable);