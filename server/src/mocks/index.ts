import express from "express";
import { createUsers } from "./users";
import { createCentre } from "./centre";
const router = express.Router();

router.get("/seed", async (req, res) => {
  await createCentre(3);
  await createUsers(25);
  console.log("seed completed successfully...");
  res.status(200).send("ok");
});

export default router;
