const favoriteUtils = {
  // A utility function to check if a media is already in the list of favorites
  check: ({ listFavorites, mediaId }) =>
    // Check if the list of favorites exists and if the mediaId can be found in the list
    listFavorites &&
    listFavorites.find((e) => e.mediaId.toString() === mediaId.toString()) !==
      undefined,
};

export default favoriteUtils;
