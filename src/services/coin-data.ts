import axios from "axios";
import _isEqual from "lodash/isEqual";
import logger from "../config/logger";

import { Coin } from "./../models/coin";

type coinType = {
	id: string;
	symbol: string;
	name: string;
};

export async function loadCoinList(): Promise<void> {
	let data = [];
	let page = 0;

	while (page < 10) {
		try {
			const list = await axios.get(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=true&price_change_percentage=7d`
			);

			data.push(list.data);
			page++;
		} catch (err) {
			console.log(err);
		}
	}

	data = data.reduce((acc, cur) => acc.concat(cur), []);
	// data = [...new Set(data)];

	//1. 만약 Redis에 Cache 되어 있는 데이터랑 위의 list data 를 일치한다면 return;
	// if (_isEqual(redis.get("listData"), data)) {
	// 	return;
	// }

	//2. Redis에 data 정보 저장
	// redis.set("listData", data);

	for await (let coin of data) {
		let [
			id,
			name,
			symbol,
			market_cap_rank,
			image,
			price,
			price_change_percentage_24h,
			price_change_percentage_7d,
			market_cap,
			total_volume,
			chart_data,
		] = [
			coin.id,
			coin.name,
			coin.symbol,
			coin.market_cap_rank,
			coin.image,
			coin.current_price,
			coin.price_change_percentage_24h,
			coin.price_change_percentage_7d_in_currency,
			coin.market_cap,
			coin.total_volume,
			coin.sparkline_in_7d.price,
		];

		chart_data = chart_data.map((price: number, idx: number) => {
			let obj = { x: idx, y: price };
			return JSON.stringify(obj);
		});
		try {
			await Coin.create({
				id,
				name,
				symbol,
				market_cap_rank,
				image,
				price,
				price_change_percentage_24h,
				price_change_percentage_7d,
				market_cap,
				total_volume,
				chart_data,
			});
			logger.info("Coin data has been succesfully stored");
		} catch (err) {
			console.log(err);
		}
	}
}

// loadCoinList();
// // 실시간 업데이트 정보를 불러온다
// function loadPriceData() {
// 	try {
// 		// const data = await Coin.find()
// 		for await (let coin of data) {
// 			//Coin.set(coin)		//3. db에 저장
// 		}
// 	} catch (err) {}
// }

// async function getCoinInfo() {
// 	let coin = await axios.get(
// 		"https://api.coingecko.com/api/v3/coins/bitcoin?localization=ko&tickers=false"
// 	);
// 	let data = coin.data;
// }

// async function getChartData() {
// 	let coinChart = await axios.get(
// 		"https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily"
// 	);
// 	let data = coinChart.data;
// }

// //marketCap Value
