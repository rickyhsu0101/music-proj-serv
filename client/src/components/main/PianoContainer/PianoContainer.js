import React, {Component} from "react";

import PianoKeys from '../PianoKeys/PianoKeys.js';
import MidiMap from '../MidiMap/MidiMap.js';
import PianoOption from '../PianoOption/PianoOption.js';
import NoteOptionModal from '../NoteOptionModal/NoteOptionModal.js';
import MIDISounds from 'midi-sounds-react';
import {createUpdateProject, getProject, setProjectId} from '../../../actions/projectActions';
import {withRouter} from 'react-router-dom';
import {
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
  FormGroup,
  Button
} from 'reactstrap';
//
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './PianoContainer.css';
class PianoContainer extends Component{
  state = {
    octaves: 2,
    measures: 0,
    index: 0,
    map: [],
    bpm: 120,
    buffer: 0,
    currentBeat: -1,
    modalOpened: false,
    noteLength: 1,
    modalMeasure: -1,
    modalKey: -1,
    projName:'',
    projDesc:'',
    loading: true
  };
  interval = "";
  playSequence = ()=>{
    //const baseDuration = 4*60/(this.state.bpm*16);
    this.midiSounds.cancelQueue();
    clearInterval(this.interval);
    console.log("playing");
    this.setState({index: 0, currentBeat: 0});
    const beats = [];
    const time = this.midiSounds.contextTime();
    const N = 4* 60/this.state.bpm;
    const duration4th = N/4;
    for(let i=0; i<this.state.map.length; i++){
      const beat = [[]];
      //const instruments = [];
      const pianos = [];
      for(let j =0; j < this.state.map[i].notes.length; j++){
        const noteObj = this.state.map[i].notes[j];
        const notes = [];
        let counter = 1;
        if(noteObj.left === false){
          let temp = noteObj;
          while(temp.right === true){
            temp = this.state.map[i+counter].notes.find((el) => el.key===temp.key);
            counter++;
          }
          notes.push(this.state.map[i].notes[j].key);
          console.log(i*.25, notes, 1/4*counter);
          this.midiSounds.playChordAt(time+i*duration4th+this.state.buffer, 0, notes, duration4th*counter);
        }
        
        console.log(pianos);
      }
      /*
      const piano = [0,notes, 1/4];
      const instruments = [piano];
      */
     /*
      beat.push(pianos);
      beats.push(beat);
      */
    }
    beats.push([[],[]]);
   // setTimeout(()=>{this.midiSounds.startPlayLoop(beats, this.state.bpm, 1 / 4);},100);
   // this.midiSounds.startPlayLoop(beats, this.state.bpm, 1);
    let beat = 0;
    
    this.interval = setInterval(()=>{
      beat++;
      if (beat === this.state.measures) {
        this.stopSequence();
        clearInterval(this.interval);
      }
      this.setState({currentBeat: beat});
      if(this.state.measures > 12){
        if(beat-this.state.index >11 ){
          if(this.state.measures >= this.state.index+24){
            this.setState({index: this.state.index+12});
          }else{
            this.setState({index: this.state.measures-12});
          }
        }
      }
      
    }, 60/this.state.bpm*1000);
  }
  stopSequence = ()=>{
   // this.midiSounds.stopPlayLoop();
    clearInterval(this.interval);
    this.midiSounds.cancelQueue();
    this.setState({currentBeat: -1});
  }
  playNote = pitch => {
    this.midiSounds.playChordNow(0, [pitch], 2.5);
  }
  cancelSound = () => {
    this.midiSounds.cancelQueue();
  }
  generateKeys = octaves => {
    let keyArray = [];
    for (let i = 0; i < octaves; i++) {
      for (let j = 0; j < 12; j++) {
        keyArray.push({
          keyPitch: (60 + i * 12 + j),
          keyColor: (j === 1 || j === 3 || j === 6 || j === 8 || j === 10) ? "black" : "white"
        })
      }
    }
    return keyArray.reverse();
  }
  addMeasure = () => {
    
    const measure = {
      measureNum: this.state.measures,
      notes: []
    };
    const map = this.state.map;
    map.push(measure);
    const newState = {};
    newState.measures = this.state.measures+1;
    newState.map = map;
    if(this.state.index+13 === newState.measures){
      newState.index = this.state.index+1;
    }
    this.setState(newState);
 //   console.log(this.state.map);
  }
  toggle = (measure, key) =>{
    this.setState(
      {
        modalOpened: !this.state.modalOpened, 
        noteLength: 1, 
        modalMeasure: this.state.modalOpened ? -1: measure, 
        modalKey: this.state.modalOpened ? -1: key
      });
  }
  handleClick = (e, measure, key) => {
    if(e.nativeEvent.which === 1){
      this.addNote(measure, key);
    }else if(e.nativeEvent.which ===3){
      this.toggle(measure, key);
    }
  }
  modalSubmit = () =>{
    console.log('in submit');
    this.addNote(this.state.modalMeasure, this.state.modalKey);
    this.toggle(-1,-1);
  }
  modalChange = (e) => {
    let {name, value} = e.target;
    this.setState({
      [name]: parseInt(value, 10)
    });

  }
  addNote = (measure, key) =>{
    
    const map = this.state.map;
    const length = (measure + this.state.noteLength > this.state.measures-1) ? this.state.measures-measure : this.state.noteLength;
   // console.log(measure, parseInt(this.state.noteLength), this.state.measures-1, this.state.measures-measure, this.state.noteLength);
    for(let i = 0; i < length; i++){
      let note = {
        key,
        left: true,
        right: true,
        startIndex: measure,
        endIndex: measure + length -1
      };
      if(i === 0){
        note.left = false;
      }
      if(i === length-1){
        note.right = false;
      }
     
      map[measure+i].notes.push(note);
    }
    this.setState({map: map, noteLength: 1, modalKey: -1, modalMeasure: -1});
    console.log(map);
    //console.log(this.state.map);
  }
  removeNote = (measure, key) => {
    const map = this.state.map;
    let measureLeft = measure;
    let measureRight = measure;
    let doneLeft = true;
    let doneRight = true;
    const noteArr = map[measure].notes.filter(e => {
      if(e.key === key){
        if(e.right === true){
          doneRight = false;
          measureRight++;
        }
        if(e.left === true){
          doneLeft = false;
          measureLeft--;
        }
      }
      return e.key!==key;
    });
    map[measure].notes = noteArr;
    while(!doneRight){
      doneRight = true;
      const noteArr = map[measureRight].notes.filter(e => {
        if (e.key === key && e.right === true) {
          doneRight = false;
        }
        return e.key !== key;
      });
      map[measureRight].notes = noteArr;
      measureRight++;
    }
    while (!doneLeft) {
      doneLeft = true;
      const noteArr = map[measureLeft].notes.filter(e => {
        if (e.key === key && e.left === true) {
          doneLeft = false;
        }
        return e.key !== key;
      });
      map[measureLeft].notes = noteArr;
      measureLeft--;
    }
    this.setState({map: map});
    console.log(map);
  }
  removeMeasure = () => {
    if(this.state.measures >= 0){
      const map = this.state.map;
      if(map.length>1){
        for(let i = 0; i < map[map.length-2].length;i++){
          map[map.length-2][i].right=false;
        }
      }
      map.pop();
      const newState = {};
      newState.map = map;
      newState.measures= this.state.measures-1;
      if(this.state.index!==0 && this.state.index+11===newState.measures){
        newState.index = this.state.index-1;
      }
      this.setState(newState);
    }
    
  }
  previous = () => {
    
    if(this.state.index!== 0){
      this.setState({index: this.state.index-1}, () => console.log(this.state));
    }
  }
  next = () =>{
    
    if(this.state.index+12!==this.state.measures && this.state.measures>12){
      this.setState({index: this.state.index+1}, () => console.log(this.state));
    }

  }
  leftMost = () => {
    if(this.state.index !== 0){
      this.setState({index: 0}, () => console.log(this.state));
    }
  }
  rightMost = () => {
    if(this.state.index < this.state.measures - 12 && this.state.measures > 12){
      this.setState({index: this.state.measures-12});
    };
  }
  bpmChange = (e) => {
    let {name, value} = e.target;
    this.setState({
      [name]: parseInt(value, 10)
    }, ()=>{
      if(this.state.beat!=-1){
        this.playSequence();
      }
    });
    
  }
  changeProjField = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  createOrUpdate = ()=>{
    const proj = {
      projName: this.state.projName,
      projDesc: this.state.projDesc,
      projID: this.props.project.projID,
      midiMap: this.state.midiMap
    }
    this.props.createUpdateProject(proj, this.history);
  }
  componentWillMount = ()=>{
    let currentRoute = this.props.location;
    const last = currentRoute.split("/")[currentRoute.length-1];
    if(last!==''&&last!=='project'){
      this.props.getProject(last);
    }else{
      this.setState({
        loading: false
      });
    }
  }
  componentWillReceiveProps(nextProps){
    if(this.state.loading){
      this.setState({
        projName: nextProps.project.project.projName,
        projDesc: nextProps.project.project.projDesc,
        midiMap: nextProps.project.project.midiMap,
        loading: false
      });
    }
  }
  render() {
    if(this.state.loading){
      return(
        <div></div>
      );
    }
    return(
      <div className = "container">
        <MIDISounds ref={(ref) => (this.midiSounds = ref)} appElementName="root" instruments={[0]}/>
        <Container>
        <Form id = "pianoFieldCont" onSubmit = {(e)=>e.preventDefault()}>
              <h3 className = "head"><strong>Project</strong></h3>
              <hr/>
              <FormGroup>
                <Label for="projNameInput"><b>Project Name</b></Label>
                <Input 
                  type="text" 
                  name="projName" 
                  id="projNameInput" 
                  value = {this.state.projName}
                  placeholder="Enter Project Name" 
                  onChange = {(e)=>this.changeProjField(e)}
                  invalid = {(this.props.errors.projName)? true:false}
                />
                <FormFeedback>{this.props.errors.projName}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="projDescInput"><strong>Name</strong></Label>
                <Input 
                  type="textArea" 
                  name="projDesc" 
                  id="projDescInput" 
                  value = {this.state.projDesc} 
                  placeholder="Enter Project Description" 
                  onChange = {(e)=>this.changeProjField(e)}
                  invalid = {(this.props.errors.projDesc)? true:false}
                />
                <FormFeedback>{this.props.errors.projDesc}</FormFeedback>

              </FormGroup>
            </Form>
      </Container>
        <PianoOption 
          addMeasure = {this.addMeasure}
          removeMeasure = {this.removeMeasure}
          start = {this.playSequence}
          stop = {this.stopSequence}
          bpm  = {this.state.bpm}
          bpmChange = {this.bpmChange}
        />
        <div className = "row">
          <div className = "col-2">
            <PianoKeys 
              playNote = {this.playNote} 
              octaves = {this.state.octaves} 
              keyArray = {this.generateKeys(this.state.octaves)}
            />
          </div>
          <div className = "col-10">
            <MidiMap 
              mapSequence = {this.state.map}
              keyArray = {this.generateKeys(this.state.octaves)}
              measures = {this.state.measures}
              octaves = {this.state.octaves}
              addNote = {this.handleClick}
              removeNote = {this.removeNote}
              index = {this.state.index}
              maxIndex = {this.state.measures-1}
              previous = {this.previous}
              next = {this.next}
              leftMost = {this.leftMost}
              rightMost = {this.rightMost}
              currentBeat = {this.state.currentBeat}
            />
          </div>
        </div>
        <NoteOptionModal
          modalOpened = {this.state.modalOpened}
          noteLengthChange = {this.modalChange}
          modalSubmit = {this.modalSubmit}
          toggle = {this.toggle}
          noteLength  = {this.state.noteLength}
        />
        
      </div>
    );
  }
}
const mapStateToProps = (state) =>({
  auth: state.auth,
  errors: state.errors,
  profile: state.profile,
  project: state.project
});
export default connect(mapStateToProps, {createUpdateProject, getProject, setProjectId})(withRouter(PianoContainer));