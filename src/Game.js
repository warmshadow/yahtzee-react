import React, { Component } from 'react';
import { Container, Box, Typography, Button, Hidden } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import withWidth from '@material-ui/core/withWidth';
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import clsx from 'clsx';
import "./animations.css";

const styles = {
  gameContainer: {
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    padding: 0,
    margin: "auto"
  },
  gameHeader: {
    background: "linear-gradient(45deg, #ab4f44, #737F7C)",
    backgroundSize: "150% 150%",
  },
  gameTitle: {
    color: "white",
    fontWeight: 100,
    padding: "1rem 0"
  },
  gameBonusTitle: {
    color: "white",
    padding: "1rem 0",
    fontFamily: "Arial, sans-serif",
    fontStyle: "bold"
  },
  gameButton: {
    padding: 0,
    fontSize: "1.5em",
    color: "#95625A",
    fontWeight: 300,
    transition: "0.5s",
    backgroundSize: "200% auto",
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    backgroundImage: "linear-gradient(to right, #ffffff 0%, #c9b4b1 51%, #ffffff 100%)",
    borderRadius: "0.5rem",
    border: "none",
    width: "50%",
    marginBottom: "2rem",
    textTransform: "none",
    '&:hover': {
      cursor: "pointer",
      backgroundPosition: "right center"
    },
    '&:disabled': {
      color: "darkgray",
      cursor: "not-allowed",
      opacity: 0.5,
      pointerEvents: "auto",
    }
  },
  gameButtonXS: {
  	width: "65%",
  	fontSize: "1.2em"
  }
};

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
	constructor(props){
		super(props);
		this.state = this.getInitialState();

		this.animateRoll = this.animateRoll.bind(this);
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.checkForUpperBonus = this.checkForUpperBonus.bind(this);
    this.bonusYahtzee = this.bonusYahtzee.bind(this);
    this.checkIfOver = this.checkIfOver.bind(this);
    this.resetState = this.resetState.bind(this);
	}

	getInitialState(){
    const initialState = {
      dice: Array.from({ length: NUM_DICE }).map(d => 5),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      rolling: false,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      },
      gameOver: false,
      bonusUpperPoints: undefined,
      bonusYahtzee: false,
      getsYahtzeeBonus: false,
      bonusYahtzeePoints: 0,
      availableJoker: {
        ones: false,
        twos: false,
        threes: false,
        fours: false,
        fives: false,
        sixes: false,
        threeOfKind: false,
        fourOfKind: false,
        fullHouse: false,
        smallStraight: false,
        largeStraight: false,
        yahtzee: false,
        chance: false
      },
    };
    return initialState;
  }

  resetState(){
    this.setState(this.getInitialState);
    this.animateRoll();
  }

  componentDidMount(){
    this.animateRoll();
  }

  animateRoll(){
    this.setState({rolling: true}, () => {
      setTimeout(this.roll, 1000);
    });
  }

  roll(evt){
    //roll unlocked dice and reset bonus yahtzee related states
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false,
      availableJoker: st.bonusYahtzee ? this.getInitialState().availableJoker : st.availableJoker,
      bonusYahtzee: false,
      getsYahtzeeBonus: false,
    }), () => { this.bonusYahtzee() });
  }

  toggleLocked(idx){
    //toggle whether idx for dice is locked or not
    if (this.state.rollsLeft && !this.state.rolling && !this.state.gameOver){
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  }

  doScore(rulename, ruleFn){
    //calculate the score for the rulename by calling a rule function
    //when bonus yahtzee only allow specific ones to be scored and add bonus points if available
    //
    //pass two params instead of one to functions for fullHouse and both straights (different scoring for bonus yahtzee)
    const ruleFnResult = ["fullHouse", "smallStraight","largeStraight"].includes(rulename) 
    ? ruleFn(this.state.dice, this.state.bonusYahtzee) 
    : ruleFn(this.state.dice); 
    if(!this.state.rolling){
      if( 
        (!this.state.bonusYahtzee && this.state.scores[rulename] === undefined) 
        || (this.state.bonusYahtzee && this.state.availableJoker[rulename]) 
      ) {
        this.setState(st => ({
          scores: { ...st.scores, [rulename]: ruleFnResult },
          rollsLeft: NUM_ROLLS,
          locked: Array(NUM_DICE).fill(false),
          bonusYahtzeePoints: st.getsYahtzeeBonus ? st.bonusYahtzeePoints + 100 : st.bonusYahtzeePoints
        }), () => { this.checkForUpperBonus() });
      }
    }
  }

  checkForUpperBonus(){
    //set the upper bonus score when all upper section is filled
    const bonusUpperNotSet = this.state.bonusUpperPoints === undefined;
    const upperScores = Object.values(this.state.scores).slice(0,6);
    const upperFilled = upperScores.every(score => score !== undefined);
    if(bonusUpperNotSet && upperFilled){
      const totalUpperScores = upperScores.reduce((total, curScore) => total + curScore);
      this.setState({
        bonusUpperPoints: totalUpperScores >= 63 ? 35 : 0
      });
      this.checkIfOver();
    }
    else { this.checkIfOver() }
  }

  displayRollInfo(){
    const messages = [
      "0 Rolls Left",
      "1 Roll Left",
      "2 Rolls Left",
      "Starting Roll"
    ];
    return messages[this.state.rollsLeft];
  }

  bonusYahtzee(){
    //check for rolled bonus yahtzee, set rule rows available for scoring it and determine if bonus points will be given
  	const diceValues = this.state.dice;
    const scores = this.state.scores;
  	const allEqual = diceValues.every(v => v === diceValues[0]);

  	if(allEqual && scores.yahtzee !== undefined){
  		const number = diceValues[0];
  		const allScoreNames = Object.keys(scores);
  		const scoreName = allScoreNames[number - 1];
  		if(scores[allScoreNames[number - 1]] === undefined){
  			this.setState(st => ({
  				bonusYahtzee: true,
  				availableJoker: { ...st.availableJoker, [scoreName]: true },
          getsYahtzeeBonus: st.scores.yahtzee === 50 ? true : false
  			}));
  		}
  		else {
  			let availableJoker = {...this.state.availableJoker};
  			const lowerNames = allScoreNames.slice(6);
  			const lowerAvailable = lowerNames.some(score => scores[score] === undefined);
  			if(lowerAvailable){
  				lowerNames.forEach(ls => {
  					if(scores[ls] === undefined) availableJoker[ls] = true;
  				});
  				this.setState(st => ({
  					bonusYahtzee: true,
  					availableJoker: availableJoker,
            getsYahtzeeBonus: st.scores.yahtzee === 50 ? true : false
  				}));
  			}
  			else {
  				const upperNames = allScoreNames.slice(0,6);
  				upperNames.forEach(ls => {
  					if(scores[ls] === undefined) availableJoker[ls] = true;
  				});
  				this.setState(st => ({
  					bonusYahtzee: true,
  					availableJoker: availableJoker,
            getsYahtzeeBonus: st.scores.yahtzee === 50 ? true : false
  				}));
  			}
  		}
  	}
  }

  checkIfOver(){
    //game over when whole scoretable is filled
    const scoreBoardFull = Object.values(this.state.scores).every(s => s !== undefined);
    if(scoreBoardFull){
      this.setState({
        gameOver: true,
        bonusYahtzee: false,
        locked: Array(NUM_DICE).fill(true)
      });
    }
    else { 
      this.animateRoll(); 
    }
  }

	render(){
		const { dice, locked, rollsLeft, rolling, scores, bonusUpperPoints, 
            gameOver, bonusYahtzee, bonusYahtzeePoints, availableJoker } = this.state;
		const classes = this.props.classes;
    const buttonClasses = this.props.width === 'xs' ? clsx(classes.gameButton, classes.gameButtonXS) : classes.gameButton;
		return (
			<Container maxWidth="sm" className={classes.gameContainer}>
        <Box component="header" px="3rem" className={classes.gameHeader}>
          <Hidden xsUp={bonusYahtzee}>
            <Typography variant="h2" className={classes.gameTitle}>
              Yahtzee!
            </Typography>
          </Hidden>
          <Hidden xsUp={!bonusYahtzee}>
            <Typography variant="h2" className={clsx(classes.gameBonusTitle, "bounceIn")}>
              BONUS!!!
            </Typography>
          </Hidden>
          <Dice
            dice={dice}
            locked={locked}
            handleClick={this.toggleLocked}
            disabled={!rollsLeft || gameOver}
            rolling={rolling}
          />
          <Hidden xsUp={gameOver} >
            <Button 
            	disabled={locked.every(x => x) || rolling} 
            	className={buttonClasses}
            	onClick={this.animateRoll}
            >
            	{this.displayRollInfo()}
            </Button>
          </Hidden>             
          <Hidden xsUp={!gameOver} >
            <Button
              className={buttonClasses} 
              style={{fontStyle: 'italic'}}
              onClick={this.resetState}
            >
              PLAY AGAIN?
            </Button>
          </Hidden>
        </Box>
        <ScoreTable 
          doScore={this.doScore} 
          scores={scores} 
          bonusUpperPoints={bonusUpperPoints} 
          gameOver={gameOver} 
          bonusYahtzee={bonusYahtzee} 
          bonusYahtzeePoints={bonusYahtzeePoints} 
          availableJoker={availableJoker}
        />
      </Container>
		);
	}
}

export default withStyles(styles)(withWidth()(Game));