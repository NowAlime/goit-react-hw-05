import { useState, lazy, Suspense } from "react";
import Navigation from "../Navigation/Navigation";
import Loader from "../Loader/Loader";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));

export default function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <header>
        <div>
          <Navigation />
        </div>
      </header>
      <main>
        

        
        <Suspense fallback={<Loader />}>
          <Routes>
   
            <Route path="/" element={<HomePage onLoad={setLoading} />} />
        
            <Route path="/movies" element={<MoviesPage onLoad={setLoading} />} />
     
            <Route
              path="/movies/:movieId"
              element={<MovieDetailsPage onLoad={setLoading} />}
            >
     
              <Route path="cast" element={<MovieCast />} />
            
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
           
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
