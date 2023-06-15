const userAdapter = (apiData) => {
  return {
    avatarUrl: "",
    name: apiData.name,
    email: apiData.email,
    userName: apiData.username,
    dateOfBirth: null,
    phoneNumber: apiData.phone,
    website: apiData.website,
    address: "",
    city: apiData.address.city,
    postcode: apiData.zipcode,
  };
};

export { userAdapter };
