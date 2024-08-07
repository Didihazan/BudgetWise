import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Star.css';

const Star = ({ style }) => {
    return (
        <FontAwesomeIcon icon={faStar} size="1x" className="sparkling-star" style={style} />

    );
};

export default Star;
