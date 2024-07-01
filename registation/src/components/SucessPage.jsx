
import React from 'react';
import { Link } from 'react-router-dom';
import '../components/SuccessPage.css';

const SuccessPage = () => {
    return (
        <div className="success-container">
            <h1>Successfully Registered!</h1>
            <p>Thank you for registering. your data Successfully store in our database</p>
            <Link to="/" className="home-link">Go back to Home</Link>
        </div>
    );
};

export default SuccessPage;
