import React from 'react';

export default function Redo_complete_button(props) {
    if (props.redo === true) {
        return (
            <button 
            className='icon_button'
            aria-label='redo step'
            title='Redo Step'
            onClick={props.redo_function}
            >
                <i className='material-icons'>redo</i>
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
                <div className="checkmark"></div>
            </button>

        )
    }
}