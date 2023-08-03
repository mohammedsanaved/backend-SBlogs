import express from "express";

const router = express.Router();

router.post("/api/register", (req, res) => {
  console.log("register EndPOint", req.body);
});
export default router;
