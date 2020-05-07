import React, { PureComponent } from 'react';
import { Box, Typography, Table, TableBody, Hidden } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import RuleRow from "./RuleRow";
import { ones, twos, threes, fours, fives, sixes, threeOfKind, fourOfKind, fullHouse, smallStraight, largeStraight, yahtzee, chance } from './Rules';
import clsx from 'clsx';
import "./animations.css";

const styles = {
  scoreTable: {
    backgroundColor: "white",
  },
  scoreSection: {
    position: "relative",
  },
  sectionTitle: {
  	padding: "1rem 0",
  	color: "#485570",
  },
  totalScore: {
  	padding: "1rem 0 0",
  	display: "inline-block",
  	borderBottom: "1px solid darkgray",
  	color: "#95625A",
    fontStyle: "normal",
  },
  highScore: {
  	paddingTop: "0.3rem",
  	paddingBottom: "1.2rem",
  	fontWeight: 300,
  	fontStyle: "italic",
  	textTransform: "uppercase",
  	color: "#737F7C",
  	fontSize: "1.1rem"
  },
  bonus: {
    position: "absolute",
    display: "inline",
    top: "1.05rem",
    paddingLeft: "4rem",
    color: "gray",
    opacity: 0.8,
  }
};

class ScoreTable extends PureComponent {
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

  getTotalScore(){
    const {scores, gameOver, bonusUpperPoints, bonusYahtzeePoints} = this.props;
    let totalScore = 0;
    for(let key in scores){
      if(scores[key]) totalScore += scores[key];
    }
    return gameOver ? (totalScore + bonusUpperPoints + bonusYahtzeePoints) : totalScore;
  }

  setHighScore(curHighScore) {
    const curTotal = this.getTotalScore();
    if(curTotal > curHighScore) {
      localStorage.setItem("highScore", curTotal);
      return curTotal;
    }
    else { return curHighScore; }
  }

	render(){
		const { classes, descScores, scores, doScore, gameOver, bonusUpperPoints, bonusYahtzee, availableJoker, bonusYahtzeePoints } = this.props;

    const curHighScore = localStorage.getItem("highScore");
    const highScore = gameOver ? this.setHighScore(curHighScore) : curHighScore ;
    //additional classes/animations from animations.css file
    const upperBonusClasses = clsx(classes.bonus, "bounceIn", { "dropUpper": gameOver });
    const yahtzeeBonusClasses = clsx(classes.bonus, "bounceIn", { "dropLower": gameOver });
    const totalScoreClasses = clsx(classes.totalScore, { "pulsateTotalScore": gameOver });
		return(
      <Box component="main" className={classes.scoreTable}>
        <Box component="section" px="1rem" className={classes.scoreSection}>
          <Typography variant="h5" className={classes.sectionTitle}>Upper</Typography>
          <Hidden xsUp={!bonusUpperPoints} >
            <Typography variant="h5" className={upperBonusClasses}>+{bonusUpperPoints}</Typography>
          </Hidden>
	        <Table padding="none">
	          <TableBody>
	            <RuleRow 
                name="Ones" 
                score={scores.ones} 
                doScore={evt => doScore("ones", ones.evalRoll)} 
                descScores={descScores.twos} 
                bonusYahtzee={bonusYahtzee} 
                availableJoker={availableJoker.ones} 
              />
	            <RuleRow 
                name="Twos" 
                score={scores.twos} 
                doScore={evt => doScore("twos", twos.evalRoll)} 
                descScores={descScores.twos} bonusYahtzee={bonusYahtzee} 
                availableJoker={availableJoker.twos} 
              />
	            <RuleRow 
                name="Threes" 
                score={scores.threes} 
                doScore={evt => doScore("threes", threes.evalRoll)} 
                descScores={descScores.threes} 
                bonusYahtzee={bonusYahtzee} 
                availableJoker={availableJoker.threes} 
              />
	            <RuleRow 
                name="Fours" 
                score={scores.fours} 
                doScore={evt => doScore("fours", fours.evalRoll)} 
                descScores={descScores.fours} 
                bonusYahtzee={bonusYahtzee} 
                availableJoker={availableJoker.fours} 
              />
	            <RuleRow 
                name="Fives" 
                score={scores.fives} 
                doScore={evt => doScore("fives", fives.evalRoll)} 
                descScores={descScores.fives} 
                bonusYahtzee={bonusYahtzee} 
                availableJoker={availableJoker.fives} 
              />
	            <RuleRow 
                name="Sixes" 
                score={scores.sixes} 
                doScore={evt => doScore("sixes", sixes.evalRoll)} 
                descScores={descScores.sixes} 
                bonusYahtzee={bonusYahtzee} 
                availableJoker={availableJoker.sixes} 
              />
	          </TableBody>
	        </Table>
        </Box>
        <Box component="section" px="1rem" className={classes.scoreSection}>
        	<Typography variant="h5" className={classes.sectionTitle}>Lower</Typography>
          <Hidden xsUp={!bonusYahtzeePoints} >
            <Typography variant="h5" className={yahtzeeBonusClasses}>+{bonusYahtzeePoints}</Typography>
          </Hidden>
        	<Table padding="none">
        		<TableBody>
        		  <RuleRow 
                name="Three of Kind" 
                score={scores.threeOfKind} 
                doScore={evt => doScore("threeOfKind", threeOfKind.evalRoll)} 
                descScores={descScores.threeOfKind} 
                bonusYahtzee={bonusYahtzee} 
                availableJoker={availableJoker.threeOfKind} 
              />
              <RuleRow 
                name="Four of Kind" 
                score={scores.fourOfKind} 
                doScore={evt => doScore("fourOfKind", fourOfKind.evalRoll)} 
                descScores={descScores.fourOfKind} 
                bonusYahtzee={bonusYahtzee} 
                availableJoker={availableJoker.fourOfKind} 
              />
              <RuleRow 
                name="Full House" 
                score={scores.fullHouse} 
                doScore={evt => doScore("fullHouse", fullHouse.evalRoll)} 
                descScores={descScores.fullHouse} 
                bonusYahtzee={bonusYahtzee} 
                availableJoker={availableJoker.fullHouse} 
              />
              <RuleRow 
                name="Small Straight" 
                score={scores.smallStraight} 
                doScore={evt => doScore("smallStraight", smallStraight.evalRoll)} 
                descScores={descScores.smallStraight} 
                bonusYahtzee={bonusYahtzee} 
                availableJoker={availableJoker.smallStraight} 
              />
              <RuleRow 
                name="Large Straight" 
                score={scores.largeStraight} 
                doScore={evt => doScore("largeStraight", largeStraight.evalRoll)} 
                descScores={descScores.largeStraight} 
                bonusYahtzee={bonusYahtzee} 
                availableJoker={availableJoker.largeStraight} 
              />
              <RuleRow 
                name="Yahtzee" 
                score={scores.yahtzee} 
                doScore={evt => doScore("yahtzee", yahtzee.evalRoll)} 
                descScores={descScores.yahtzee} 
                bonusYahtzee={bonusYahtzee} 
                availableJoker={availableJoker.yahtzee} 
              />
              <RuleRow 
                name="Chance" 
                score={scores.chance} 
                doScore={evt => doScore("chance", chance.evalRoll)} 
                descScores={descScores.chance} 
                bonusYahtzee={bonusYahtzee} 
                availableJoker={availableJoker.chance} 
              />
        		</TableBody>
        	</Table>
        </Box>
        <Typography variant="h5" className={totalScoreClasses}>TOTAL SCORE: {this.getTotalScore()}</Typography>
        <Typography variant="h6" className={classes.highScore}>High Score: {highScore}</Typography>
      </Box>
		);
	}
}

export default withStyles(styles)(ScoreTable);