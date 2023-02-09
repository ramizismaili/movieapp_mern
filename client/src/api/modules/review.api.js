import privateClient from "../client/private.client";


// Object containing the endpoint URLs for reviews.
const reviewEndpoints = {
  list: "reviews",
  add: "reviews",
  remove: ({ reviewId }) => `reviews/${reviewId}`,
};


// Object containing the API functions for handling reviews.
const reviewApi = {
    // Function to add a review.
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, content }) => {
    try {
        // Making a POST request to the endpoint for adding reviews.
      const response = await privateClient.post(reviewEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        content,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  // remove review
  remove: async ({ reviewId }) => {
    try {
      const response = await privateClient.delete(
        reviewEndpoints.remove({ reviewId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  // get list of reviews
  getList: async () => {
    try {
      const response = await privateClient.get(reviewEndpoints.list);

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default reviewApi;
