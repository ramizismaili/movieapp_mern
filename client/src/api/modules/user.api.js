import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

// Object containing endpoints for user API
const userEndpoints = {
  signin: "user/signin",
  signup: "user/signup",
  getInfo: "user/info",
  passwordUpdate: "user/update-password",
};

// Object with functions for user API
const userApi = {
  // Function for user sign in
  signin: async ({ username, password }) => {
    try {
      // Making a POST request to the "signin" endpoint using the "publicClient"
      const response = await publicClient.post(userEndpoints.signin, {
        username,
        password,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  signup: async ({ username, password, confirmPassword, displayName }) => {
    try {
      const response = await publicClient.post(userEndpoints.signup, {
        username,
        password,
        confirmPassword,
        displayName,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  getInfo: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getInfo);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  passwordUpdate: async ({ password, newPassword, confirmNewPassword }) => {
    try {
      const response = await privateClient.put(userEndpoints.passwordUpdate, {
        password,
        newPassword,
        confirmNewPassword,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default userApi;
