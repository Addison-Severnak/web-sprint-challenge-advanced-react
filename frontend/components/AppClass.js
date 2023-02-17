import React, { useState } from 'react';
import axios from 'axios';

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

// POST variables
const URL = 'http://localhost:9000/api/result';
let xCoord = 2;
let yCoord = 2;

// const initialState = {
//   message: initialMessage,
//   email: initialEmail,
//   index: initialIndex,
//   steps: initialSteps,
// }

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  constructor() {
    super();
    this.state = {
      message: initialMessage,
      email: initialEmail,
      steps: initialSteps,
      index: initialIndex,
    }
  }

  getXY = () => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    if(this.state.index === 0){
      xCoord = 1;
      yCoord = 1;
      return `(${xCoord}, ${yCoord})`;
    } 
    else if(this.state.index === 1){
      xCoord = 2;
      yCoord = 1;
      return `(${xCoord}, ${yCoord})`;
    }
    else if(this.state.index === 2){
      xCoord = 3;
      yCoord = 1;
      return `(${xCoord}, ${yCoord})`;
    }
    else if(this.state.index === 3){
      xCoord = 1;
      yCoord = 2;
      return `(${xCoord}, ${yCoord})`;
    }
    else if(this.state.index === 4){
      xCoord = 2;
      yCoord = 2;
      return `(${xCoord}, ${yCoord})`;
    }
    else if(this.state.index === 5){
      xCoord = 3;
      yCoord = 2;
      return `(${xCoord}, ${yCoord})`;
    }
    else if(this.state.index === 6){
      xCoord = 1;
      yCoord = 3;
      return `(${xCoord}, ${yCoord})`;
    }
    else if(this.state.index === 7){
      xCoord = 2;
      yCoord = 3;
      return `(${xCoord}, ${yCoord})`;
    }
    else if(this.state.index === 8){
      xCoord = 3;
      yCoord = 3;
      return `(${xCoord}, ${yCoord})`;
    }
  }

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates ${this.getXY()}`;
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({message: initialMessage});
    this.setState({email: initialEmail});
    this.setState({steps: initialSteps});
    this.setState({index: initialIndex});
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'left' && !(this.state.index === 6 || this.state.index === 3 || this.state.index === 0)){ 
      this.setState({index: this.state.index - 1}) //setIndex(index - 1);
      this.setState({steps: this.state.steps + 1}) //setSteps(steps + 1);
      if(this.state.message != "") this.setState({message: initialMessage}) //setMessage(initialMessage);
    }
    
    else if(direction === 'up' && !(this.state.index === 2 || this.state.index === 1 || this.state.index === 0)){
      this.setState({index: this.state.index - 3})
      this.setState({steps: this.state.steps + 1}) 
      if(this.state.message != "") this.setState({message: initialMessage})
    }
    
    else if(direction === 'right' && !(this.state.index === 8 || this.state.index === 5 || this.state.index === 2)){
      this.setState({index: this.state.index + 1}) //setIndex(index + 1);
      this.setState({steps: this.state.steps + 1})
      if(this.state.message != "") this.setState({message: initialMessage})
    }
    
    else if(direction === 'down' && !(this.state.index === 8 || this.state.index === 7 || this.state.index === 6)){
      this.setState({index: this.state.index + 3}) //setIndex(index + 3);
      this.setState({steps: this.state.steps + 1})
      if(this.state.message != "") this.setState({message: initialMessage})
    } 
    
    else if(direction === 'left'){
      this.setState({message: "You can't go left"}); //setMessage("You can't go left");
    }
    else if(direction === 'up'){
      this.setState({message: "You can't go up"});
    }
    else if(direction === 'right'){
      this.setState({message: "You can't go right"});
    }
    else if(direction === 'down'){
      this.setState({message: "You can't go down"});
    }
  }

  moveLeft = () => {
    this.getNextIndex('left');
  }
  moveRight = () => {
    this.getNextIndex('right');
  }
  moveUp = () => {
    this.getNextIndex('up');
  }
  moveDown = () => {
    this.getNextIndex('down');
  }

  stepMessage = () => {
    if(this.state.steps === 1) return `You moved ${this.state.steps} time`;
    else return `You moved ${this.state.steps} times`;
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">{this.stepMessage()}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.moveLeft}>LEFT</button>
          <button id="up" onClick={this.moveUp}>UP</button>
          <button id="right" onClick={this.moveRight}>RIGHT</button>
          <button id="down" onClick={this.moveDown}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
