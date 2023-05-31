const normalizeUser = (userData) => {
  if (!userData.image) {
    userData.image = {};
  }
  userData.image = {
    url:
      userData.image.url ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    alt: userData.image.alt || "Default User Profile Picture",
  };
  return {
    ...userData,
    address: {
      ...userData.address,
      state: userData.address.state || "",
    },
  };
};

module.exports = normalizeUser;
