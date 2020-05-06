import React, { Component } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/core/";
import Game from "./Game";
import './App.css';

const theme = createMuiTheme({
  typography: {
    h5: {
      fontWeight: 300,
      fontStyle: "italic",
    },
  }
});

class App extends Component {
  render (){
    return (
      <div className="App">
      	<ThemeProvider theme={theme}>
        	<Game/>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
