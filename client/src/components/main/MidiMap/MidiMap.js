import React, {Component} from 'react';
import MidiNote from '../MidiNote/MidiNote.js';
import './MidiMap.css';
class MidiMap extends Component{
  state = {
    currentIndex: 0,
    maxIndex: 0
  }
  generateCell = (key, measure, active) => {
    let hasNote = false;
    let startIndex = -2;
    let endIndex = -2;
    if(this.props.mapSequence.length > measure){
      const note = this.props.mapSequence[measure].notes.find(note => note.key === (60 + this.props.octaves * 12 - 1 - key));
      if (note) {
        hasNote = true;
        startIndex = note.startIndex;
        endIndex = note.endIndex;
      }
    }
    //console.log((measure + this.props.index)+" " + this.props.currentBeat);
    //console.log(startIndex+" "+this.props.currentBeat+" "+endIndex );
    return (
      <MidiNote 
        key = {`${key+60}-${measure+this.props.index}`} 
        activity = {active}
        hasNote = {hasNote}
        beat = {startIndex<=this.props.currentBeat&&this.props.currentBeat<=endIndex}
        addNote = {(e) => this.props.addNote(e, measure, 60+this.props.octaves*12-1-key)}  
        removeNote = {() => this.props.removeNote(measure, 60+this.props.octaves*12-1-key)}
      />
    );
  }
  generateMapColumn = () => {

    const rows = [];
    for(let j = 0; j < 12*this.props.octaves; j++){
      const row = [];
      for (let i = 0; i < 12; i++) {
        let active = false;
        if(i < this.props.measures){
          active = true;
        }
        row.push(this.generateCell(j,i+this.props.index,active))
      }
      rows.push(<div className = "row" key = {j}>{row}</div>);
    }
    return rows;
  }
  render(){
    const measureNum = [];
    for(let i = 0; i < 12; i++){
      measureNum.push(<div className="col-1 textContainer" key={i}><div className="measureText">{this.props.index+i+1}</div></div>);
    }
    return(
      <div>
        
        <div className="container">
          <div className = "row">
           <div className = "col-1">
              <button 
                className = {`btn left ${(this.props.index!==0) ? "btn-primary": "btn-secondary"}`}
                onClick = {this.props.leftMost}
              >
                <i className = "material-icons" >
                  first_page </i>
              </button>
            </div>
            <div className = "col-1">
              <button 
                className = {`btn left ${(this.props.index!==0) ? "btn-primary": "btn-secondary"}`}
                onClick = {this.props.previous}
              >
                <i className = "material-icons" >
                  arrow_back_ios </i>
              </button>
            </div>
            <div className = "col-1"></div>
            <div className = "col-1"></div>
            <div className = "col-1"></div>
            <div className = "col-1"></div>
            <div className = "col-1"></div>
            <div className = "col-1"></div>
            <div className = "col-1"></div>
            <div className = "col-1"></div>
            <div className = "col-1">
              <button 
                className = {`btn right ${(this.props.index+12<=this.props.maxIndex) ? "btn-primary": "btn-secondary"}`}
                onClick = {this.props.next}
              >
                <i className = "material-icons" >
                  arrow_forward_ios </i>
              </button>
            </div>
            <div className = "col-1">
              <button 
                className = {`btn right ${(this.props.index+12<=this.props.maxIndex) ? "btn-primary": "btn-secondary"}`}
                onClick = {this.props.rightMost}
              >
                <i className = "material-icons" >
                  last_page </i>
              </button>
            </div>
          </div>
          <div className = "row">{measureNum}</div>
          {this.generateMapColumn()}
        </div>
        
      </div>
    );
  }
}
export default MidiMap;