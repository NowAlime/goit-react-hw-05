import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import NextPage from "../../components/NextPage/NextPage";
import fetchMovie from "../../components/fetchMovie/fetchMovie";
import Error from "../../components/Error/Error";
import Loader from "../../components/Loader/Loader";

const MoviesPage = ({ onLoad }) => {
  const [filmSearch, setFilmSearch] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true); 
      setError(false);

      try {
        const data = await fetchMovie(query, page);
        setFilmSearch((prevMovies) =>
          page === 1 ? data.results : [...prevMovies, ...data.results]
        );
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false); 
        onLoad(false);
      }
    };

    fetchMovies();
  }, [searchParams, onLoad]);

  const handleMovieSearch = (searchTerm) => {
    setSearchParams({ query: searchTerm, page: 1 });
  };

  const handleNextPage = () => {
    setSearchParams({ query, page: page + 1 });
  };

  return (
    <div>
      {error && <Error />}
      <SearchForm onSearch={handleMovieSearch} />
      {loading && <Loader />}
      {filmSearch.length > 0 && <MovieList movies={filmSearch} />}
      {filmSearch.length > 0 && !loading && <NextPage onChang={handleNextPage} />}
    </div>
  );
};

export default MoviesPage;
