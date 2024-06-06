import React from "react";
import "./About.scss"; // Import your CSS file for styling
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="about-container layout">
            <div className="about-content">
                <h1>About Us</h1>
                <p>
                    Welcome to our project! We are a team of passionate
                    individuals dedicated to bringing you the latest and most
                    relevant information in various domains.
                </p>
                <p>
                    Our mission is to provide a platform where users can explore
                    articles on technology, science, sports, politics, movies,
                    automobiles, and more.
                </p>
                <p>
                    Feel free to browse through our diverse range of articles
                    created by our team of talented authors. Whether you're
                    looking for the latest tech trends, scientific discoveries,
                    or updates on your favorite sports, we've got you covered.
                </p>
                <p>
                    Thank you for being a part of our community. If you have any
                    questions or suggestions, please don't hesitate to reach
                    out. Enjoy your journey with us!
                </p>
                <p className="highlight-text">
                    Explore the latest trends and discoveries with our news
                    network.
                </p>
                <p className="quote">
                    "Knowledge is power. Information is liberating."
                </p>
                <p className="contact-info">
                    If you have any inquiries, feel free to{" "}
                    <Link to="/contact-us">contact us</Link>.
                </p>
            </div>
        </div>
    );
};

export default About;
