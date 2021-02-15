import express, { Request, Response } from "express";
import { loadCoins } from "../controllers/coin";

const router = express.Router();

router.get("/coin/list", (req: Request, res: Response) => {
	return loadCoins(req, res);
});

export default router;
