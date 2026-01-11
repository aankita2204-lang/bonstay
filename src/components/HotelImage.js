import { useState } from "react";
import "./HotelImage.css";

/**
 * HotelImage component with loading state and error fallback
 * @param {string} src - The image URL
 * @param {string} alt - Alt text for the image
 * @param {string} className - Optional CSS class
 */
const HotelImage = ({ src, alt, className = "" }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    return (
        <div className={`hotel-image-container ${className}`}>
            {isLoading && !hasError && (
                <div className="hotel-image-skeleton">
                    <div className="skeleton-shimmer"></div>
                </div>
            )}

            {hasError ? (
                <div className="hotel-image-fallback">
                    <span className="fallback-icon">🏨</span>
                </div>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={`hotel-img ${isLoading ? 'loading' : 'loaded'}`}
                    onLoad={handleLoad}
                    onError={handleError}
                    loading="lazy"
                />
            )}
        </div>
    );
};

export default HotelImage;
