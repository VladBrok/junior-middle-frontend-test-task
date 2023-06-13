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

export default userService;
