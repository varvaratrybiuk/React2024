import React from 'react';
import style from './style.module.css';

export default function Button(props) {
    const { text, onClick, color } = props;
    return (
        <button
            className={style.button}
            style={{ background: color }}
            onClick={onClick}
        >
            {text}
        </button>
    )
}
