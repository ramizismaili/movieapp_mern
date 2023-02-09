import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const mediaEndpoints = {
  // Endpoint to list media of a given type and category
  list: ({ mediaType, mediaCategory, page }) =>
    `${mediaType}/${mediaCategory}?page=${page}`,
  // Endpoint to retrieve details of a media item with a given ID
  detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
  // Endpoint to search for media of a given type using a query string
  search: ({ mediaType, query, page }) =>
    `${mediaType}/search?query=${query}&page=${page}`,
};

// Object that contains the API functions for making requests to the media APIs
const mediaApi = {
  // Function to retrieve a list of media items for a given type and category
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory, page })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  // Function to retrieve details of a media item with a given ID
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  // Function to search for media items using a query string
  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ mediaType, query, page })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default mediaApi;
