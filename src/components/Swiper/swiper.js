import './swiper.css';
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";

function SwiperItem(props) {
    return (
        <div className="swiper-item">
            <img src={props.image} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <Link to={props.link} className='underline right-arrow'>Learn more</Link>
        </div>
    );
}

function Swiper(props) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());

    function getVisibleSlides() {
        const width = window.innerWidth;
        if (width < 600) return 1;
        if (width < 900) return 2;
        if (width < 1250) return 3;
        return 5;
    }

    useEffect(() => {
        const handleResize = () => {
            setVisibleSlides(getVisibleSlides());
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(props.items.length - visibleSlides, 0);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    if (!props.items || props.items.length === 0) {
        return null;
    }

    return (
        <div className='swiper'>
            <div className="swiper-container">
                <div
                    className="swiper-wrapper"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
                        transition: 'transform 0.3s ease'
                    }}
                >
                    {props.items.map((item, index) => (
                        <SwiperItem
                            key={index}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>
            {currentIndex > 0 && <button className="swiper-button-prev" onClick={handlePrev}>←</button>}
            {currentIndex <= maxIndex - 1 && <button className="swiper-button-next" onClick={handleNext}>→</button>}
        </div>
    );
}

export default Swiper;