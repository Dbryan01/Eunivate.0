import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation

const EuStore = () => {
  const navigate = useNavigate(); // React Router hook for programmatic navigation

  useEffect(() => {
    // Store the current path before redirecting
    const currentPath = window.location.pathname;

    // Redirect to the external URL
    window.location.href = 'https://eustore.mseuf.edu.ph/';

    // Add a popstate event listener to detect when the user navigates back
    const handlePopState = () => {
      // Redirect to the home page
      navigate('/');
    };

    window.addEventListener('popstate', handlePopState);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  return null; // Optionally display a message like "Redirecting..."
};

export default EuStore;
