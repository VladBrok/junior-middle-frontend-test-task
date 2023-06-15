import fetch from "auth/FetchInterceptor";
import { ARTIFICIAL_API_DELAY_MS } from "constants/ApiConstant";
import Utils from "utils";

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

userService.putUser = async function (id, data) {
  console.log("Updating user", id, data);
  await Utils.delay(ARTIFICIAL_API_DELAY_MS);
};

export default userService;
