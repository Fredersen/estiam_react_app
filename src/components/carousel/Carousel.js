import React, { useState, useEffect } from 'react';
import './Carousel.css';

const CARDS_DATA = [
    {
        id: 1,
        title: 'Card Title 1',
        description: 'Card Description 1',
        imageUrl: 'https://picsum.photos/id/1/600/300',
    },
    {
        id: 2,
        title: 'Card Title 2',
        description: 'Card Description 2',
        imageUrl: 'https://picsum.photos/id/2/600/300',
    },
    {
        id: 3,
        title: 'Card Title 3',
        description: 'Card Description 3',
        imageUrl: 'https://picsum.photos/id/3/600/300',
    },
];

function Carousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveIndex((activeIndex + 1) % CARDS_DATA.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [activeIndex]);

    const prevCard = () => {
        setActiveIndex(activeIndex === 0 ? CARDS_DATA.length - 1 : activeIndex - 1);
    };

    const nextCard = () => {
        setActiveIndex((activeIndex + 1) % CARDS_DATA.length);
    };

    return (
        <div className="carousel">
            <div className="arrow left-arrow" onClick={prevCard}>
                &#10094;
            </div>
            {CARDS_DATA.map((card, index) => (
                <div key={card.id} className={`card ${index === activeIndex ? 'active' : ''}`}>
                    <img src={card.imageUrl} alt="image" />
                    <div className="card-content">
                        <h2>{card.title}</h2>
                        <p>{card.description}</p>
                    </div>
                </div>
            ))}
            <div className="arrow right-arrow" onClick={nextCard}>
                &#10095;
            </div>
        </div>
    );
}

export default Carousel;
