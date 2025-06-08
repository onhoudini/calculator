import React from "react";
import './Button.css'

export default props=>
    <button 
        onClick={e=>props.click(props.label)}
        className={`
        button
        ${props.operation ? 'operation': ''}
        ${props.delete ? 'delete': ''}
        ${props.double ? 'double': ''}
        ${props.quadruple ? 'quadruple': ''}
        ${props.equals ? 'equals': ''}
        `}
        >
            {props.label}

    </button>