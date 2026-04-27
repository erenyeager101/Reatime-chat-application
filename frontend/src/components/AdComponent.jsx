import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * AdComponent - A component to display an advertisement.
 *
 * @param {Object} props - The component props.
 * @param {string} props.adId - The ID of the advertisement to display.
 * @returns {JSX.Element} The rendered AdComponent.
 */
const AdComponent = ({ adId }) => {
  // State to store the ad data
  const [adData, setAdData] = useState(null);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to track errors
  const [error, setError] = useState(null);

  // Fetch ad data when the component mounts or when adId changes
  useEffect(() => {
    const fetchAdData = async () => {
      try {
        // Simulate fetching ad data from an API
        const response = await fetch(`https://api.example.com/ads/${adId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ad data');
        }
        const data = await response.json();
        setAdData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdData();
  }, [adId]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-600">Loading advertisement...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-100 rounded-lg">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  // Render ad data
  return (
    <article className="p-4 bg-white rounded-lg shadow-md">
      <header className="mb-2">
        <h2 className="text-xl font-bold text-gray-800">{adData.title}</h2>
      </header>
      <div className="mb-4">
        <img
          src={adData.imageUrl}
          alt={adData.title}
          className="w-full h-auto rounded-md"
        />
      </div>
      <div className="mb-4">
        <p className="text-gray-700">{adData.description}</p>
      </div>
      <footer className="flex justify-end">
        <a
          href={adData.ctaUrl}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {adData.ctaText}
        </a>
      </footer>
    </article>
  );
};

// PropTypes for the component
AdComponent.propTypes = {
  adId: PropTypes.string.isRequired,
};

export default AdComponent;