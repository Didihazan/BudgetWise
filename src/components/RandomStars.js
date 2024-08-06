import React from 'react';
import Star from './Star'; // נתיב נכון לקובץ Star

const RandomStars = ({ numStars }) => {
    const stars = Array.from({ length: numStars }).map((_, index) => {
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * (window.innerHeight / 3); // לפזר בחלק העליון של המסך

        const style = {
            position: 'absolute',
            top: `${randomY}px`,
            left: `${randomX}px`,
            color: '#ffffff',
        };

        return <Star key={index} style={style} />;
    });

    return (
        <div className="stars-container">
            {stars}
        </div>
    );
};

export default RandomStars;
