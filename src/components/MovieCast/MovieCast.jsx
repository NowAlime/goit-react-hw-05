import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchCast from "../fetchCast/fetchCast";
import css from "./MovieCast.module.css";
import Error from "../Error/Error";

const MovieCast = () => {
  const [allCast, setAllCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { movieId } = useParams();

  useEffect(() => {
    const loadCast = async () => {
      try {
        setError(null);
        setLoading(true);

        const cast = await fetchCast(movieId);
        setAllCast(cast.data.cast);
      } catch (error) {
        setError('Failed to load cast. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadCast();
  }, [movieId]);

  if (loading) {
    return <p>Loading cast...</p>;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (allCast.length === 0) {
    return <p>No cast available for this movie.</p>;
  }

  return (
    <div>
      <ul className={css.list}>
        {allCast.map((cast) => (
          <li className={css.listItem} key={cast.id}>
            {cast.profile_path ? (
              <img
                className={css.image}
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt={cast.name}
              />
            ) : (
              <div className={css.placeholderImage}>No Image</div>
            )}

            <h2 className={css.title}>{cast.name}</h2>
            <p className={css.character}>Character: {cast.character}</p>
            <p className={css.popularity}>Popularity: {cast.popularity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
