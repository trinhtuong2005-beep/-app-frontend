import React from "react";

const MovieCard = ({ movie, onClick }) => {
  return (
    <div
      className="movie-card"
      onClick={onClick}
      data-testid={`movie-card-${movie.id}`}
    >
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} loading="lazy" />
        <div className="movie-overlay">
          <span className="view-details">Xem chi tiết</span>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title" data-testid={`movie-title-${movie.id}`}>
          {movie.title}
        </h3>
        <div className="movie-meta">
          <span className="movie-year" data-testid={`movie-year-${movie.id}`}>
            {movie.year}
          </span>
          <span className="movie-rating" data-testid={`movie-rating-${movie.id}`}>
            ⭐ {movie.rating}
          </span>
        </div>
        <div className="movie-genres">
          {movie.genre.slice(0, 2).map((g, idx) => (
            <span key={idx} className="genre-tag">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
