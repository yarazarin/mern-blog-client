//src/components/Footer.js
import y from "../img/y.jpg";
import React, { useState, useEffect } from "react";
import toronto from "../img/toronto.png";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1200);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (isMobile) {
        return (
            <footer className="mobile-footer">
                <div className="mobile-social-icons">
                    <a href="mailto:uraeel@gmail.com" className="mobile-social-link">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/yarazarin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-social-link"
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <a
                        href="https://github.com/yarazarin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-social-link"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </div>
                <p className="mobile-copyright">
                    <img src={toronto} alt="toronto" className="mobile-toronto" />
                    Yara Zarin 2024
                </p>
            </footer>
        );
    }

    return (
        <>
            <footer className="footer_">
                    <div className="author-container">
                        <img
                            src={y}
                            alt="Author"
                            className="author-picture"
                        />
                        <div class="drop"></div>
                        <div class="drop drop_2"></div>
                    </div>
                <div className="social-icons">
                    <a href="mailto:uraeel@gmail.com">
                        <FontAwesomeIcon
                            icon={faEnvelope}
                            size="2x"
                        />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/yarazarin"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={faLinkedin}
                            size="2x"
                        />
                    </a>
                    <a
                        href="https://github.com/yarazarin"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon
                            icon={faGithub}
                            size="2x"
                        />
                    </a>
                    <p><img src={toronto} alt="toronto" className="toronto" /> Yara Zarin 2024</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
