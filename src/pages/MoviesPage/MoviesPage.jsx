import { useEffect } from "react";
import axios from "axios";

const MoviesPage = ({ setLoading }) => {
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Your data fetching logic here
        const response = await axios.get("API_ENDPOINT");
        // Process the response data
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading]);

  return <div>Movies Page Content</div>;
};

export default MoviesPage;