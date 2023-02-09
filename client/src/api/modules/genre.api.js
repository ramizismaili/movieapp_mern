import publicClient from "../client/public.client";

const genreEndpoints = {
  // Endpoint for retrieving the list of genres for a specific media type
  list: ({ mediaType }) => `${mediaType}/genres`,
};

// Object that contains methods for interacting with the genre API
const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      // Making a GET request to the endpoint for retrieving the list of genres
      const response = await publicClient.get(
        genreEndpoints.list({ mediaType })
      );
      // Returning the response from the API
      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default genreApi;
