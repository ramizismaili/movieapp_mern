import publicClient from "../client/public.client";

// Object containing the endpoint URLs for person data.
const personEndpoints = {
  detail: ({ personId }) => `person/${personId}`,
  medias: ({ personId }) => `person/${personId}/medias`,
};

// Object containing the API functions for handling person data.
const personApi = {
  // Function to get details of a person.
  detail: async ({ personId }) => {
    try {
      // GET request to the endpoint for getting details of a person.

      const response = await publicClient.get(
        personEndpoints.detail({ personId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
  // Function to get the media associated with a person.
  medias: async ({ personId }) => {
    try {
      const response = await publicClient.get(
        personEndpoints.medias({ personId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default personApi;
