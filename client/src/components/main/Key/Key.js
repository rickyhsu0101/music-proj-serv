import React from 'react';
import './Key.css';
const Key = props => {
  return(
    <div 
      className = {`key ${props.keyColor}`} 
      onClick = {props.playNote}
    >
      
    </div>
  );
};

export default Key;