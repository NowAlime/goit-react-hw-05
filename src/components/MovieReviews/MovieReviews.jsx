import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchReviews from "../fetchReviews/fetchReviews";
import css from "./MovieReviews.module.css";
import Error from "../Error/Error";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { movieId } = useParams();

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setError(null);
        setLoading(true);

        const reviews = await fetchReviews(movieId);
        setReviews(reviews.data.results);
      } catch (error) {
        setError('Failed to load reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, [movieId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (reviews.length === 0) {
    return <p>No reviews available for this movie.</p>;
  }

  return (
    <div className={css.container}>
      <ul className={css.list}>
        {reviews.map((review) => (
          <li className={css.listItem} key={review.id}>
            <div className={css.reviewsContainer}>
              {review.author_details.avatar_path ? (
                <img
                  className={css.image}
                  src={`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}
                  alt={review.author_details.name || "Author"}
                />
              ) : (
                <div className={css.placeholderImage}>No Image</div>
              )}
              <div className={css.author}>
                <h2 className={css.title}>
                  {review.author_details.name || "Anonymous"}
                </h2>
                {review.author_details.rating && (
                  <p className={css.rating}>
                    Rating: {review.author_details.rating}
                  </p>
                )}
              </div>
            </div>
            <p className={css.data}>{new Date(review.created_at).toLocaleDateString()}</p>
            <p className={css.review}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default MovieReviews;
