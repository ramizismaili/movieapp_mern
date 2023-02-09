import privateClient from "../client/private.client";

const favoriteEndpoints = {
  list: "user/favorites", // Endpoint for listing the favorites
  add: "user/favorites", // Endpoint for adding a favorite
  remove: ({ favoriteId }) => `user/favorites/${favoriteId}`, // Endpoint for removing a favorite
};

const favoriteApi = {
  // Function to get the list of favorites
  getList: async () => {
    try {
      // a GET request to the list endpoint using the private client
      const response = await privateClient.get(favoriteEndpoints.list);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  // Function to add a favorite
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }) => {
    try {
      // a POST request to the add endpoint using the private client
      // and passing the media information as data
      const response = await privateClient.post(favoriteEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  // Function to remove a favorite
  remove: async ({ favoriteId }) => {
    try {
      const response = await privateClient.delete(
        favoriteEndpoints.remove({ favoriteId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default favoriteApi;
