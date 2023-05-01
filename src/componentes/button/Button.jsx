import React from "react";
import "./button.css"

export function ButtonChild (props){
    return(
        <button
        onClick={props.onClick}
        className="btn"
        >
            {props.children}
        </button>
    )
}