import React from 'react';

// todo : mv to const file;
let weekday=new Array(7);
weekday[0]="Monday";
weekday[1]="Tuesday";
weekday[2]="Wednesday";
weekday[3]="Thursday";
weekday[4]="Friday";
weekday[5]="Saturday";
weekday[6]="Sunday";


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