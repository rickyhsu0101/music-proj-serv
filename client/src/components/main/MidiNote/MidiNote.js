import React, {Component} from 'react';
import './MidiNote.css';
class MidiNote extends Component {
  state = {
    noteOn: false
  };
  handleNote = (e) => {
    e.preventDefault();
    if(this.props.activity){
      if(!this.props.hasNote){
        this.props.addNote(e);

      }else{
        this.props.removeNote();
      }
    }
  }
  render (){
    
    return(
      <div 
        className = 
        {`gridNote ${this.props.activity ? "active": "inactive"} 
          ${this.props.hasNote ? "used" : ""} 
          ${this.props.corner?"corner":""} col-1
          ${(this.props.beat && this.props.hasNote) ? "playing": ""}
        `}
        onClick = {this.handleNote}
        onContextMenu = {this.handleNote}
      >

      </div>
    );
  };
}
export default MidiNote;