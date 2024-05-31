import axios from "axios";

export const TOKEN_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2Y2VlMTI1OTRmNDY3MmIzMDYzMzdiODIyY2JkNzI5NyIsInN1YiI6IjY2NTg0OWVhMWQwNGYzYjQ0ZDJkMjRiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CqdMfxyGYpj8lgcXDmGxDmd5tUhrQMBSMVK_WD_ANac";

axios.defaults.baseURL = "https://api.themoviedb.org";

export default async function fetchMovie(searchQuery, page) {
  const data = await axios.get(`/3/search/movie`, {
    params: {
      query: searchQuery,
      page: page,
    },
    headers: {
      Authorization: `Bearer ${TOKEN_KEY}`,
    },
  });
  return data.data;
}