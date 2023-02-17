import React, { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

// POST variables
const URL = 'http://localhost:9000/api/result';
let xCoord = 2;
let yCoord = 2;


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    if(index === 0){
      xCoord = 1;
      yCoord = 1;
      return `(${xCoord}, ${yCoord})`;
    } 
    else if(index === 1) return '(2, 1)';
    else if(index === 2) return '(3, 1)';
    else if(index === 3) return '(1, 2)';
    else if(index === 4) return '(2, 2)';
    else if(index === 5) return '(3, 2)';
    else if(index === 6) return '(1, 3)';
    else if(index === 7) return '(2, 3)';
    else if(index === 8) return '(3, 3)';
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    return `Coordinates ${getXY()}`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setIndex(initialIndex);
    setSteps(initialSteps);
    setMessage(initialMessage);
    setEmail(initialEmail);
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    if(direction === 'left' && !(index === 6 || index === 3 || index === 0)){ 
      setIndex(index - 1);
      setSteps(steps + 1);
    }
    
    else if(direction === 'up' && !(index === 2 || index === 1 || index === 0)){
      setIndex(index - 3);
      setSteps(steps + 1);
    }
    
    else if(direction === 'right' && !(index === 8 || index === 5 || index === 2)){
      setIndex(index + 1);
      setSteps(steps + 1);
    }
    
    else if(direction === 'down' && !(index === 8 || index === 7 || index === 6)){
      setIndex(index + 3);
      setSteps(steps + 1);
    } else return index;
  }

  function moveLeft() {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getNextIndex('left');
  }
  function moveRight() {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getNextIndex('right');
  }
  function moveUp() {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getNextIndex('up');
  }
  function moveDown() {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    getNextIndex('down');
  }


  function onChange(evt) {
    // You will need this to update the value of the input.
    const { value } = evt.target;
    setEmail(value);
  }

  function postEmail() {
    axios.post(URL, { x: xCoord, y: yCoord, steps: steps, email: email })
      .then(res => {
        setMessage(res.data.message);
      })
      .catch(err => {
        setMessage(err.response.data.message);
      })
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    postEmail();
  }

  function stepMessage() {
    if(steps === 1) return `You moved ${steps} time`;
    else return `You moved ${steps} times`;
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">{stepMessage()}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={moveLeft}>LEFT</button>
        <button id="up" onClick={moveUp}>UP</button>
        <button id="right" onClick={moveRight}>RIGHT</button>
        <button id="down" onClick={moveDown}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
