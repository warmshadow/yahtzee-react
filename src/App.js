import React, { Component } from 'react';
import './App.css';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Game from "./Game";



// const useStyles = makeStyles({
//   game: {
//     boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
//     padding: 0,
//     height: "100vh",
//   },
//   gameHeader: {
//     background: "linear-gradient(-45deg, #673ab7, #9c27b0)",
//     backgroundSize: "400% 400%",
//     animation: "$Gradient 15s ease infinite",
//   },
//   gameTitle: {
//     color: "white",
//     fontWeight: 100
//   },
//   gameDice: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "20px",
//   },
//   gameReroll: {
//     padding: 0,
//     fontSize: "1.5em",
//     color: "white",
//     fontWeight: 100,
//     transition: "0.5s",
//     backgroundSize: "200% auto",
//     boxShadow: "0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
//     backgroundImage: "linear-gradient(to right, #91eae4 0%, #7f7fd5 51%, #91eae4 100%)",
//     borderRadius: "0.5rem",
//     border: "none",
//     width: "50%",
//     marginBottom: "2rem",
//     textTransform: "none",
//     '&:hover': {
//       cursor: "pointer",
//       backgroundPosition: "right center"
//     },
//     '&:disabled': {
//       color: "white",
//       backgroundColor: "#ddd",
//       cursor: "not-allowed",
//       opacity: 0.5,
//       pointerEvents: "auto",
//     }
//   },
//   scoreTable: {
//     backgroundColor: "white",
//   },
//   ruleRowCell: {
//     borderBottom: "1px solid black",
//   },
//   '@keyframes Gradient': {
//     "0%": {
//       backgroundPosition: "0% 50%"
//     },
//     "50%": {
//       backgroundPosition: "100% 50%"
//     },
//     "100%": {
//       backgroundPosition: "0% 50%"
//     }
//   }
// });

class App extends Component {
  render (){
    // const classes = useStyles();
    const { classes } = this.props;
    return (
      <div className="App">
        <Game/>
      </div>
    );
  }
}

// export default App;
export default App;
