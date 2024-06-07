import React from 'react';

const renderRatingStars = (rating, h, w) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        if (i < rating) {
            stars.push(<svg key={i} width={w} height={h} fill="#FFC400" xmlns="http://www.w3.org/2000/svg" style={{ width: `${w}px`, height: `${h}px` }}>
                <g clipPath="url(#a)" className=''>
                    <path d="M6.448 2.029a.5.5 0 0 0-.896 0L4.287 4.59l-2.828.41a.5.5 0 0 0-.277.854l2.046 1.994-.483 2.816a.5.5 0 0 0 .726.528L6 9.863l2.53 1.33a.5.5 0 0 0 .725-.527l-.483-2.817 2.046-1.994a.5.5 0 0 0-.277-.853L7.713 4.59 6.448 2.029Z"></path>
                </g>
                <defs>
                    <clipPath id="a">
                        <path fill="#fff" transform="translate(1 1.5)" d="M0 0h10v10H0z"></path>
                    </clipPath>
                </defs>
            </svg>);
        } else {
            stars.push(<svg key={i} width={w} height={h} fill="#DDDDE3" xmlns="http://www.w3.org/2000/svg" style={{ width: `${w}px`, height: `${h}px` }}>
                <g clipPath="url(#a)">
                    <path d="M6.448 2.029a.5.5 0 0 0-.896 0L4.287 4.59l-2.828.41a.5.5 0 0 0-.277.854l2.046 1.994-.483 2.816a.5.5 0 0 0 .726.528L6 9.863l2.53 1.33a.5.5 0 0 0 .725-.527l-.483-2.817 2.046-1.994a.5.5 0 0 0-.277-.853L7.713 4.59 6.448 2.029Z"></path>
                </g>
                <defs>
                    <clipPath id="a">
                        <path fill="#fff" transform="translate(1 1.5)" d="M0 0h10v10H0z"></path>
                    </clipPath>
                </defs>
            </svg>);
        }
    }
    return stars;
};

export default renderRatingStars;
