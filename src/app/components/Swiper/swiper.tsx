'use client';
import styles from './swiper.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UrlObject } from 'node:url';

type SwiperItemProps = {
    image: string;
    title: string;
    description: string;
    link: string | UrlObject;
};

function SwiperItem(props: SwiperItemProps) {
    return (
        <div className={styles.swiper__item}>
            <img src={props.image} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <Link href={props.link} className="link--underline right-arrow">
                Learn more
            </Link>
        </div>
    );
}

type SwiperProps = {
    items: SwiperItemProps[];
};

function Swiper({ items }: SwiperProps) {
    function getVisibleSlides() {
        const width = window.innerWidth;
        if (width < 600) return 1;
        if (width < 900) return 2;
        if (width < 1250) return 3;
        return 5;
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleSlides, setVisibleSlides] = useState(1);

    useEffect(() => {
        const updateSlides = () => {
            setVisibleSlides(getVisibleSlides());
        };

        updateSlides(); // вызвать сразу после монтирования
        window.addEventListener('resize', updateSlides);
        return () => window.removeEventListener('resize', updateSlides);
    }, []);

    const maxIndex = Math.max(items.length - visibleSlides, 0);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    if (!items || items.length === 0) {
        return null;
    }

    return (
        <div className={styles.swiper}>
            <div className={styles.swiper__box}>
                <div
                    className={styles.swiper__wrapper}
                    style={{
                        transform: `translateX(-${currentIndex * (100 / visibleSlides)}%)`,
                        transition: 'transform 0.3s ease',
                    }}
                >
                    {items.map((item, index: number) => (
                        <SwiperItem
                            key={index}
                            image={item.image}
                            title={item.title}
                            description={item.description}
                            link={item.link}
                        />
                    ))}
                </div>
            </div>
            {currentIndex > 0 && (
                <button
                    className={styles.swiper__buttonPrev}
                    onClick={handlePrev}
                >
                    ←
                </button>
            )}
            {currentIndex <= maxIndex - 1 && (
                <button
                    className={styles.swiper__buttonNext}
                    onClick={handleNext}
                >
                    →
                </button>
            )}
        </div>
    );
}

export default Swiper;
