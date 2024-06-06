import React from "react";
import { Link } from "react-router-dom";
import {
    FaEnvelope,
    FaLinkedin,
    FaFacebookSquare,
    FaInstagramSquare,
} from "react-icons/fa";
import "./Contact.scss";

const Contact = () => {
    return (
        <div className="contact-container layout">
            <div className="contact-content">
                <h1>Contact Us</h1>
                <p>
                    We'd love to hear from you! Feel free to reach out through
                    any of the following channels:
                </p>
                <div className="social-links">
                    <Link to="mailto:info@example.com" className="email-link">
                        <FaEnvelope />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/company/example"
                        className="linkedin-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedin />
                    </Link>
                    <Link
                        href="https://www.facebook.com/example"
                        className="facebook-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaFacebookSquare />
                    </Link>
                    <Link
                        href="https://www.instagram.com/example"
                        className="instagram-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaInstagramSquare />
                    </Link>
                </div>
                <p>
                    Connect with us on social media for the latest updates and
                    news!
                </p>
            </div>
        </div>
    );
};

export default Contact;
