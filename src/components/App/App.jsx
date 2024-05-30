import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Loader from "../Loader/Loader";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const NoteFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));


 function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        {loading && <Loader />}
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage setLoading={setLoading} />} />
            <Route path="/movies" element={<MoviesPage setLoading={setLoading} />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage setLoading={setLoading} />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NoteFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;