import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Home.css';

const Star = ({ style }) => {
    return (
        <FontAwesomeIcon icon={faStar} size="1x" style={style} />

    );
};

export default Star;
