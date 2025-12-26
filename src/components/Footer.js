//src/components/Footer.js
import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLinkedin,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <>
            <footer className="footer_">
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
                    {/* <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a> */}
                    <p>
                        ©Yara Zarin, All rights reserved
                        2024
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
