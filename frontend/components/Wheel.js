import React from 'react'
import { connect } from 'react-redux'

import { moveClockwise, moveCounterClockwise } from '../state/action-creators'

function Wheel(props) {
  const handleClockwise = e => {
    e.preventDefault();
    let newPosition = props.wheel + 1;
    if (newPosition > 5) {
      newPosition = 0;
    }
    props.moveClockwise(newPosition);
  };

  const handleCounterClockwise = e => {
    e.preventDefault();
    let newPosition = props.wheel - 1;
    if (newPosition < 0) {
      newPosition = 5;
    }
    props.moveCounterClockwise(newPosition);
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        { props.wheel === 0 ? <div className="cog active" style={{ "--i": 0 }}>B</div> : <div className="cog" style={{ "--i": 0 }}></div> }
        { props.wheel === 1 ? <div className="cog active" style={{ "--i": 1 }}>B</div> : <div className="cog" style={{ "--i": 1 }}></div> }
        { props.wheel === 2 ? <div className="cog active" style={{ "--i": 2 }}>B</div> : <div className="cog" style={{ "--i": 2 }}></div> }
        { props.wheel === 3 ? <div className="cog active" style={{ "--i": 3 }}>B</div> : <div className="cog" style={{ "--i": 3 }}></div> }
        { props.wheel === 4 ? <div className="cog active" style={{ "--i": 4 }}>B</div> : <div className="cog" style={{ "--i": 4 }}></div> }
        { props.wheel === 5 ? <div className="cog active" style={{ "--i": 5 }}>B</div> : <div className="cog" style={{ "--i": 5 }}></div> }
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={ handleCounterClockwise } >Counter clockwise</button>
        <button id="clockwiseBtn" onClick={ handleClockwise } >Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    wheel: state.wheel
  }
}

export default connect(mapStateToProps, { moveClockwise, moveCounterClockwise })(Wheel)


