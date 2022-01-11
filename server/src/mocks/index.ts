import express from "express";
// import { createCategories } from "./categories";
import { createUsers } from "./users";
// import { createMessageThread } from "./messages";
const router = express.Router();

router.get("/seed", async (req, res) => {
  // await createCategories();
  await createUsers(5);
  // await createMessageThread(5);
  console.log("seed completed successfully...");
  res.status(200).send("ok");
});

export default router;
