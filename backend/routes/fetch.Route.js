import express from "express"
import FetchingPrices from "../controller/fetch.Stocks.js"
import protectRoute from "../middleware/protectRoute.js"

const router = express.Router()

router.get('/news',FetchingPrices.fetchNews)

router.post('/add-watchlist',protectRoute,FetchingPrices.addWatchList)
router.get('/watchlist',protectRoute,FetchingPrices.fetchWatchList)
router.post('/remove-watchlist',protectRoute,FetchingPrices.removeWatchList)
router.get('/fetch-history',protectRoute,FetchingPrices.tradeHistory)
router.get('/fetch-history-transaction',protectRoute,FetchingPrices.transactionHistory)

export default router
