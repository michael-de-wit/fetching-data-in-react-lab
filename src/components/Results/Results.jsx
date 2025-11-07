import { useState, useEffect } from 'react';

const Results = (props) => {

    // console.log(`props`, props);
    const {starships} = props;
    // console.log(`starships RES`, starships);

    return (
        <ul>
            {starships.map((starship, index) => (
                <li key={index}>
                    <p className='starship-name'>{starship.name}</p>
                    <div className='starship-info-box'>
                        <p className='starship-info'><span className='starship-info-label'>class</span>: {starship.starship_class}</p>
                        <p className='starship-info'><span className='starship-info-label'>manufacturer</span>: {starship.manufacturer}</p>
                        <p className='starship-info'><span className='starship-info-label'>model</span>: {starship.model}</p>
                    </div>
                </li>
            ))}
        </ul>
    )

}

export default Results;