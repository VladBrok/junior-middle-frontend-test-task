const userAdapter = (apiData) => {
  return apiData.map((data) => ({
    id: data.id.toString(),
    name: data.name,
    email: data.email,
    img: null,
    role: null,
    lastOnline: null,
    status: null,
    personalInfo: {
      location: data.address.city,
      title: null,
      birthday: null,
      phoneNumber: data.phone,
      facebook: null,
      twitter: null,
      instagram: null,
      site: data.website,
    },
  }));
};

export { userAdapter };
