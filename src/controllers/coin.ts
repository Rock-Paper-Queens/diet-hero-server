import { Request, Response } from "express";
import { Coin } from "../models/coin";

export async function loadCoins(req: Request, res: Response) {
	let { page, limit } = req.query;

	if (!limit) {
		limit = "25";
	}

	if (!page) {
		page = "1";
	}

	let coinList = await Coin.findAndCountAll({
		order: [["market_cap_rank", "ASC"]],
		limit: Number(limit),
		offset: Number(page) * Number(limit),
	});
	console.log(coinList);
	return res.status(200).send(coinList);
}
