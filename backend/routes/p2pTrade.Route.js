import express from "express"
import TradeController from "../controller/trade.Controller.js"

const router = express.Router()

router.post('/place-order',TradeController.placeOrder)
router.post('/close-order',TradeController.closeOrder)
router.get('/orders/:userId',TradeController.fetchOrder)

export default router