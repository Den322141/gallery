// src/components/ArtCard.jsx - обновите для новых данных
import { useRef, useEffect } from 'react';

export const ArtCard = ({ artwork, isActive, onActivate }) => {
    const titleRef = useRef(null);
    const dateRef = useRef(null);
    const wrapperRef = useRef(null);
    const originalRef = useRef(null);
    const hoverRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        if (titleRef.current && dateRef.current && wrapperRef.current && originalRef.current && hoverRef.current && lineRef.current) {
            const titleHeight = titleRef.current.offsetHeight;
            const dateHeight = dateRef.current.offsetHeight;
            const totalHeight = titleHeight + dateHeight + 8;
            
            wrapperRef.current.style.minHeight = totalHeight + 'px';
            originalRef.current.style.minHeight = totalHeight + 'px';
            hoverRef.current.style.minHeight = totalHeight + 'px';
            lineRef.current.style.height = totalHeight + 'px';
        }
    }, [artwork]);

    const handleMouseEnter = () => {
        if (titleRef.current && dateRef.current && lineRef.current) {
            const titleHeight = titleRef.current.offsetHeight;
            const dateHeight = dateRef.current.offsetHeight;
            const totalHeight = titleHeight + dateHeight + 8;
            lineRef.current.style.height = totalHeight + 'px';
        }
    };

    const handleMouseLeave = () => {
        if (titleRef.current && dateRef.current && lineRef.current) {
            const titleHeight = titleRef.current.offsetHeight;
            const dateHeight = dateRef.current.offsetHeight;
            const totalHeight = titleHeight + dateHeight + 8;
            lineRef.current.style.height = totalHeight + 'px';
        }
    };

    const handleClick = () => {
        if (window.innerWidth <= 768) {
            onActivate(artwork.id);
        }
    };

    return (
        <div 
            className={`art-card ${isActive ? 'active' : ''}`}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="art-image" style={{ backgroundImage: `url(${artwork.image})` }}></div>
            <div className="card-bottom">
                <div className="card-overlay">
                    <div className="title-date-row">
                        <div ref={lineRef} className="vertical-line"></div>
                        <div ref={wrapperRef} className="title-wrapper">
                            <div ref={originalRef} className="original-content" style={{ width: '100%' }}>
                                <div className="title-line">
                                    <span ref={titleRef} className="art-title original-title">{artwork.title}</span>
                                    <span ref={dateRef} className="art-date original-date">{artwork.date}</span>
                                </div>
                            </div>
                            <div ref={hoverRef} className="hover-content" style={{ width: '100%' }}>
                                <div className="title-line">
                                    <span className="hover-title">JEAN HONORE FRAGONARD</span>
                                    <span className="hover-date">LOUVRE MUSEUM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="arrow-slide">
                    <svg viewBox="0 0 24 24">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};