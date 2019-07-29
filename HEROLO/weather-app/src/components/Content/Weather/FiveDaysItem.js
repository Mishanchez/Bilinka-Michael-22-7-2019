import React from 'react';
import {weekday} from '../../../constants'


const FiveDaysItem  = (props) => {


    return (
        <div className='five_days'>
            <p>{weekday[new Date(props.date).getDay()]}</p>
            <p>Min {props.minTemp} {props.unit} </p>
            <p>Max {props.maxTemp} {props.unit}  </p>
        </div>

    )
};


export default FiveDaysItem ;