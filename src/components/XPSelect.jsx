import React from 'react'
import Select from 'react-select'
import {Ledgers} from '../assets/data/ledgers'



const XPSelect = (props) => (
  <Select 
  className="XPSelect" 
  options={Ledgers} 
  onClick={props.onClick}
  onChange={props.onChange}
  
  />
)

export default XPSelect;
