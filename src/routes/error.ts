import { Router } from "express";
const router = Router();

router.use("*", function (_req, res) {
  res.send(404);
});

export default router;
