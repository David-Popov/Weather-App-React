import './input.css'
import { FiSearch } from "react-icons/fi";
import React from 'react'

const Input = ({text,submit}) => {
    return(
        <form className="input" onSubmit={submit} onChange={text} >
            <input type={"text"}  placeholder="Type name of city..." className='input-value'/>
            <span className='input-icon'><FiSearch /></span>
        </form>
    )
}

export default Input