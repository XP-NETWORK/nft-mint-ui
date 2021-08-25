import React from 'react'
import Select from 'react-select'
import {Ledgers} from '../assets/data/ledgers'

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
    color: "white"
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}



const XPSelect = (props) => (
  <Select 
  styles={customStyles}
  className="XPSelect" 
  options={Ledgers} 
  onClick={props.onClick}
  onChange={props.onChange}
  
  />
)

export default XPSelect;
