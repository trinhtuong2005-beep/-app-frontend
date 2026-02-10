import React from "react";

const Sidebar = ({
  allGenres,
  selectedGenres,
  onGenreToggle,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <aside className="sidebar" data-testid="sidebar">
      <div className="sidebar-section">
        <h3 data-testid="search-title">🔍 Tìm kiếm</h3>
        <input
          type="text"
          className="search-input"
          placeholder="Nhập tên phim..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          data-testid="search-input"
        />
      </div>

      <div className="sidebar-section">
        <h3 data-testid="genre-filter-title">🎭 Thể loại</h3>
        <div className="genre-filters" data-testid="genre-filters">
          {allGenres.map((genre) => (
            <label key={genre} className="checkbox-label" data-testid={`genre-label-${genre}`}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => onGenreToggle(genre)}
                data-testid={`genre-checkbox-${genre}`}
              />
              <span className="checkbox-text">{genre}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedGenres.length > 0 && (
        <div className="sidebar-section">
          <button
            className="clear-filters-btn"
            onClick={() => selectedGenres.forEach(onGenreToggle)}
            data-testid="clear-filters-btn"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
