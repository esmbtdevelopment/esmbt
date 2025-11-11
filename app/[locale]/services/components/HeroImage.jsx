"use client";
import React, { useState } from "react";

const DEFAULT_HERO_IMAGE = "/images/services/hero/digital-transformation.jpg";

export function HeroImage({ src, alt, className, width, height }) {
    const [imgSrc, setImgSrc] = useState(src || DEFAULT_HERO_IMAGE);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError && imgSrc !== DEFAULT_HERO_IMAGE) {
            setHasError(true);
            setImgSrc(DEFAULT_HERO_IMAGE);
        }
    };

    return (
        <img
            src={imgSrc}
            alt={alt}
            onError={handleError}
            className={className}
            width={width}
            height={height}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
    );
}

