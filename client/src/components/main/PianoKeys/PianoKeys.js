import React, {Component} from "react";
import Key from "../Key/Key.js";
import './PianoKeys.css';
class PianoKeys extends Component{
  
  render(){
    const _this =  this;
    return(
      <div className="container">
        <div className = "row">
          <div className = "blank"></div>
        </div>
        <div className = "row">
          <div className = "blank"></div>
        </div>
        {this.props.keyArray.map(keyObj => (
          <div className = "row" key = {keyObj.keyPitch}>
            <Key 
              playNote = {() => {_this.props.playNote(keyObj.keyPitch)}} 
              keyColor = {keyObj.keyColor}
            />
          </div>
        ))};
      </div>
    );
  }
}


export default PianoKeys;