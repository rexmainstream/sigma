import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function Redo_complete_button(props) {
    if (props.redo === true) {
        return (
            <button 
            className='icon_button'
            aria-label='redo step'
            title='Redo Step'
            onClick={props.redo_function}
            >
                <FontAwesomeIcon icon = { faRedo } />
            </button>
        )
    } else {
        return (
            <button 
            className='icon_button'
            aria-label='complete step'
            title='Complete Step'
            onClick={props.complete_function}
            >
                <FontAwesomeIcon icon = { faCheck } />
            </button>

        )
    }
}