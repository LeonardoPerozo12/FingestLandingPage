import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'; 
import '../../public/css/downButton.css';

const DownButton = () => {
    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    };

    return (
        <button onClick={handleScrollDown} className="down-button">
            <FontAwesomeIcon icon={faArrowDown} className="down-icon" />
        </button>
    );
};

export default DownButton;
