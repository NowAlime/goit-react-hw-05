import { useEffect } from "react";
import axios from "axios";
import { Outlet, useParams } from "react-router-dom";

const MovieDetailsPage = ({ setLoading }) => {
  const { movieId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
       
        const response = await axios.get(`API_ENDPOINT/${movieId}`);
     
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId, setLoading]);

  return (
    <div>
      <div>Movie Details Page Content</div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;