import React, { Component } from 'react';
import { Container, Box, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";
import withWidth from '@material-ui/core/withWidth';


const styles = {
  game: {
    boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    padding: 0,
    margin: "auto"
    // height: "80%",
  },
  gameHeader: {
    background: "linear-gradient(45deg, #ab4f44, #737F7C)",
    backgroundSize: "400% 400%",
    // animation: "$Gradient 15s ease infinite",
    // height: "32%"
  },
  gameTitle: {
    color: "white",
    fontWeight: 100,
    padding: "1rem 0"
  },
  gameReroll: {
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
      backgroundColor: "#ddd",
      cursor: "not-allowed",
      opacity: 0.5,
      pointerEvents: "auto",
    }
  },
  gameRerollXS: {
  	width: "65%",
  	fontSize: "1.2rem"
  },
  gameScores: {
  	backgroundColor: "white",
  	// height: "68%",
  },
  '@keyframes Gradient': {
    "0%": {
      backgroundPosition: "0% 50%"
    },
    "50%": {
      backgroundPosition: "100% 50%"
    },
    "100%": {
      backgroundPosition: "0% 50%"
    }
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
    this.bonusYahtzee = this.bonusYahtzee.bind(this);
    this.checkIfOver = this.checkIfOver.bind(this);
    this.resetState = this.resetState.bind(this);
	}

	getInitialState() {
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
      bonusYahtzee: false,
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

  componentDidMount() {
    this.animateRoll();
    console.log("componentDidMount");
  }

  componentDidUpdate() {
  	console.log("componentDidUpdate");
  	this.checkIfOver();
  	// this.bonusYahtzee();
  }

  animateRoll(){
    this.setState({rolling: true}, () => {
      setTimeout(this.roll, 1000);
    });
  }

  roll(evt) {
    // roll dice whose indexes are in reroll
    //console.log(typeof this.state.dice[2]);
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1,
      rolling: false,
      availableJoker: st.bonusYahtzee ? this.getInitialState().availableJoker : st.availableJoker,
      bonusYahtzee: false
    }), () => { this.bonusYahtzee() });
  }

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    if(this.state.rollsLeft && !this.state.rolling){
      this.setState(st => ({
        locked: [
          ...st.locked.slice(0, idx),
          !st.locked[idx],
          ...st.locked.slice(idx + 1)
        ]
      }));
    }
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    if(!this.state.rolling){
      if(this.state.scores[rulename] === undefined){
        this.setState(st => ({
          scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
          rollsLeft: NUM_ROLLS,
          locked: Array(NUM_DICE).fill(false)
        }));
        this.animateRoll();
      }
    }
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
  	const diceValues = this.state.dice;
  	const allEqual = diceValues.every(v => v === diceValues[0]);
  	if ( !this.state.rolling && !this.state.bonusYahtzee && allEqual && this.state.scores.yahtzee !== undefined ) {
  		const number = diceValues[0];
  		const scoreNames = Object.keys(this.state.scores);
  		const scoreName = scoreNames[number - 1];
  		console.log("BONUS YAHTZEE");
  		if ( this.state.scores[scoreNames[number - 1]] === undefined ){
  			console.log("THAT upper is free");
  			console.log(scoreNames[number - 1]);
  			this.setState(st => ({
  				bonusYahtzee: true,
  				availableJoker: { ...st.availableJoker, [scoreName]: true }
  			}));
  		}
  		else {
  			let availableJoker = {...this.state.availableJoker};
  			const lowerNames = scoreNames.slice(6);
  			const lowerAvailable = lowerNames.some(score => this.state.scores[score] === undefined);
  			if (lowerAvailable) {
  				console.log("Lower available");
  				lowerNames.forEach(ls => {
  					if (this.state.scores[ls] === undefined) availableJoker[ls] = true;
  				});
  				this.setState(st => ({
  					bonusYahtzee: true,
  					availableJoker: availableJoker
  				}));
  			}
  			else {
  				const upperNames = scoreNames.slice(0,6);
  				console.log("Any upper");
  				upperNames.forEach(ls => {
  					if (this.state.scores[ls] === undefined) availableJoker[ls] = true;
  				});
  				this.setState(st => ({
  					bonusYahtzee: true,
  					availableJoker: availableJoker
  				}));
  			}
  		}
  	}
  	else {
  		console.log("NOPE");
  	}
  }

  checkIfOver(){
    const scoreBoardFull = !Object.values(this.state.scores).some(s => s === undefined);
    if(!this.state.gameOver && scoreBoardFull){
      this.setState({gameOver: true});
    }
  }

	render(){
		const {dice, locked, rollsLeft, rolling, scores, gameOver, bonusYahtzee, availableJoker} = this.state;
		const { classes, width } = this.props;
		const buttonClasses = width === 'xs' ? `${classes.gameReroll} ${classes.gameRerollXS}` : classes.gameReroll;
		console.log("game render");
		return (
			<Container maxWidth="sm" className={classes.game}>
        <Box component="header" px="3rem" className={classes.gameHeader}>
          <Typography variant="h2" className={classes.gameTitle}>
            Yahtzee!
          </Typography>
          <Box>
            <Box component="section">
	            <Dice
	              dice={dice}
	              locked={locked}
	              handleClick={this.toggleLocked}
	              disabled={!rollsLeft}
	              rolling={rolling}
	            />
            </Box>  
            <Box>
              <Button 
              	disabled={locked.every(x => x) || !rollsLeft /*delete?kainolefttinkapirmas*/ || rolling} 
              	className={buttonClasses} 
              	onClick={this.animateRoll}
              >
              	{this.displayRollInfo()}
              </Button>
              </Box>
            </Box>
        </Box>
        <Box className={classes.gameScores}>
	        <ScoreTable doScore={this.doScore} scores={scores} gameOver={gameOver} bonusYahtzee={bonusYahtzee} availableJoker={availableJoker}/>
        </Box>
      </Container>
		);
	}
}

export default withStyles(styles)(withWidth()(Game));