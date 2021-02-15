"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCoinList = void 0;
const axios_1 = __importDefault(require("axios"));
const logger_1 = __importDefault(require("../config/logger"));
const coin_1 = require("./../models/coin");
function loadCoinList() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        let data = [];
        let page = 0;
        while (page < 10) {
            try {
                const list = yield axios_1.default.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=true&price_change_percentage=7d`);
                data.push(list.data);
                page++;
            }
            catch (err) {
                console.log(err);
            }
        }
        data = data.reduce((acc, cur) => acc.concat(cur), []);
        try {
            // data = [...new Set(data)];
            //1. 만약 Redis에 Cache 되어 있는 데이터랑 위의 list data 를 일치한다면 return;
            // if (_isEqual(redis.get("listData"), data)) {
            // 	return;
            // }
            //2. Redis에 data 정보 저장
            // redis.set("listData", data);
            for (var data_1 = __asyncValues(data), data_1_1; data_1_1 = yield data_1.next(), !data_1_1.done;) {
                let coin = data_1_1.value;
                let [id, name, symbol, market_cap_rank, image, price, price_change_percentage_24h, price_change_percentage_7d, market_cap, total_volume, chart_data,] = [
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
                chart_data = chart_data.map((price, idx) => {
                    let obj = { x: idx, y: price };
                    return JSON.stringify(obj);
                });
                try {
                    yield coin_1.Coin.create({
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
                    logger_1.default.info("Coin data has been succesfully stored");
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) yield _a.call(data_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
}
exports.loadCoinList = loadCoinList;
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
