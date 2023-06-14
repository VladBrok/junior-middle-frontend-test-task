import fetch from "auth/FetchInterceptor";

const userService = {};

userService.getUsers = async function () {
  return (
    await fetch({
      url: "/users",
      method: "get",
    })
  ).data;
};

userService.getUserById = async function (id) {
  const users = await userService.getUsers();
  const found = users.find((user) => user.id.toString() === id.toString());
  return found || null;
};

export default userService;
