import React, { useEffect } from "react";

const MovieModal = ({ movie, onClose }) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden"; // Prevent background scroll
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // Close modal on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      data-testid="modal-backdrop"
    >
      <div className="modal-content" data-testid="modal-content">
        <button
          className="modal-close"
          onClick={onClose}
          data-testid="modal-close-btn"
        >
          ✕
        </button>
        
        <div className="modal-body">
          <div className="modal-poster">
            <img src={movie.poster} alt={movie.title} />
          </div>
          
          <div className="modal-details">
            <h2 className="modal-title" data-testid="modal-title">
              {movie.title}
            </h2>
            
            <div className="modal-meta">
              <span className="meta-item" data-testid="modal-year">
                📅 {movie.year}
              </span>
              <span className="meta-item" data-testid="modal-rating">
                ⭐ {movie.rating}/10
              </span>
            </div>
            
            <div className="modal-genres" data-testid="modal-genres">
              {movie.genre.map((g, idx) => (
                <span key={idx} className="genre-tag-large">
                  {g}
                </span>
              ))}
            </div>
            
            <div className="modal-section">
              <h3>Mô tả</h3>
              <p data-testid="modal-description">{movie.description}</p>
            </div>
            
            <div className="modal-section">
              <h3>Đạo diễn</h3>
              <p data-testid="modal-director">{movie.director}</p>
            </div>
            
            <div className="modal-section">
              <h3>Diễn viên</h3>
              <p data-testid="modal-actors">{movie.actors}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
