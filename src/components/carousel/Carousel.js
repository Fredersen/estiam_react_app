import React, { useState, useEffect } from 'react';
import './Carousel.css';
import carouselImage1 from 'assets/carousel/Luxurious.webp';
import carouselImage2 from 'assets/carousel/Sans-titre.webp';
import carouselImage3 from 'assets/carousel/Sans-titre-_1_.webp';
import carouselApi from "services/carouselApi";

function Carousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselImages, setCarouselImages] = useState([]);

    useEffect(() => {
        const fetchCarouselImages = async () => {
            try {
                const fetchedCarouselImages = await carouselApi.findAll();
                setCarouselImages(fetchedCarouselImages);
            } catch (error) {
                console.error(error.response);
            }
        }
        fetchCarouselImages();
    }, []);

    useEffect(() => {
        if (carouselImages.length > 0) {
            const intervalId = setInterval(() => {
                setActiveIndex((activeIndex + 1) % carouselImages.length);
            }, 3000);
            return () => clearInterval(intervalId);
        }
    }, [activeIndex, carouselImages]);

    return (
        <div className="carousel">
            {carouselImages.map((card, index) => (
                <div key={card._id} className={`card ${index === activeIndex ? 'active' : ''}`}>
                    <img src={card.image} alt="image" />
                </div>
            ))}
        </div>
    );
}

export default Carousel;
