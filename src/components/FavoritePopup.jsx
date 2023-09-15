import React, { useEffect } from 'react';
import './FavoritePopup.css';


function FavoritePopup({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Auto-close the pop-up after 2 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="favorite-popup">
      <p>{message}</p>
    </div>
  );
}

export default FavoritePopup;

  