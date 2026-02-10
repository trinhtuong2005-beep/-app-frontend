import { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";
import { moviesData } from "./data/moviesData";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";

function App() {
  const [theme, setTheme] = useState("light");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("movie-app-theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.toggle("dark-mode", savedTheme === "dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("movie-app-theme", newTheme);
    document.body.classList.toggle("dark-mode", newTheme === "dark");
  };

  // Debounce search - only update after 400ms of no typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Extract all unique genres from movies data
  const allGenres = useMemo(() => {
    const genresSet = new Set();
    moviesData.forEach((movie) => {
      movie.genre.forEach((g) => genresSet.add(g));
    });
    return Array.from(genresSet).sort();
  }, []);

  // Filter movies based on selected genres and search query
  const filteredMovies = useMemo(() => {
    return moviesData.filter((movie) => {
      // Filter by genre
      const genreMatch =
        selectedGenres.length === 0 ||
        selectedGenres.some((genre) => movie.genre.includes(genre));

      // Filter by search query
      const searchMatch =
        debouncedSearch === "" ||
        movie.title.toLowerCase().includes(debouncedSearch.toLowerCase());

      return genreMatch && searchMatch;
    });
  }, [selectedGenres, debouncedSearch]);

  // Handle genre checkbox toggle
  const handleGenreToggle = useCallback((genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  }, []);

  // Handle search input change
  const handleSearchChange = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  // Handle movie card click
  const handleMovieClick = useCallback((movie) => {
    setSelectedMovie(movie);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  return (
    <div className="App">
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <div className="main-container">
        <Sidebar
          allGenres={allGenres}
          selectedGenres={selectedGenres}
          onGenreToggle={handleGenreToggle}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        
        <main className="content">
          <div className="movies-header">
            <h2 data-testid="movies-count">
              {filteredMovies.length === moviesData.length
                ? `Tất cả phim (${filteredMovies.length})`
                : `Tìm thấy ${filteredMovies.length} phim`}
            </h2>
          </div>
          
          <div className="movies-grid" data-testid="movies-grid">
            {filteredMovies.length === 0 ? (
              <div className="no-results" data-testid="no-results">
                <p>Không tìm thấy phim nào phù hợp với bộ lọc của bạn.</p>
              </div>
            ) : (
              filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => handleMovieClick(movie)}
                />
              ))
            )}
          </div>
        </main>
      </div>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
