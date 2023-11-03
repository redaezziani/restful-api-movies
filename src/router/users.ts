import expres from "express";
import { getAllUsers } from "../controllers/users";
import { isAuthenticated } from "../middlewares";

export default (router: expres.Router) => {
  router.get("/users", isAuthenticated,getAllUsers);
};
