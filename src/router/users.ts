import expres from "express";
import { getAllUsers  } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";
import { deletedUser } from "../controllers/users";
import { updateUser } from "../controllers/users";
export default (router: expres.Router) => {
  router.get("/users", isAuthenticated,getAllUsers);
  router.delete("/users/:id",isAuthenticated,isOwner,deletedUser);
  router.patch("/users/:id",isAuthenticated,isOwner,updateUser);

};


