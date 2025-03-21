import express from "express"
import Auth_Controller from "../controller/auth.Controller.js"
import protectRoute from "../middleware/protectRoute.js"
const router = express.Router()

router.post('/send-otp',Auth_Controller.send_sms)
router.post('/verify-otp',Auth_Controller.verify_sms)
router.post('/sign-up',Auth_Controller.signUp)
router.post('/login',Auth_Controller.login)
router.post('/gmail-otp',Auth_Controller.gmailVerification)
router.post('/verify-gmail-otp',Auth_Controller.verifyGmail)
router.post('/personal-info',Auth_Controller.personalInfo)
router.post('/identity-verify',Auth_Controller.identityVerification)
router.post('/bank-details',Auth_Controller.BankDetails)
router.post('/nominee-details',Auth_Controller.nomineeDetails)
router.post('/create-pin-pattern',Auth_Controller.PINPattern)

router.get('/me',protectRoute,Auth_Controller.AuthenticatingUser)
router.get('/logout',Auth_Controller.logout)
router.get('/fetch-profile',protectRoute,Auth_Controller.fetchProfile)

router.post('/deposit',protectRoute,Auth_Controller.deposit)
router.post('/withdraw',protectRoute,Auth_Controller.withdraw)
router.post('/transfer',protectRoute,Auth_Controller.tranfer)

// router.post('/balance',protectRoute,Auth_Controller.chkBalance)
// router.post('/deposit',protectRoute,Auth_Controller.depositBalance)
// router.post('/withdraw',protectRoute,Auth_Controller.withdrawBalance)
// router.post('/trade',protectRoute,Auth_Controller.tradeExecution)

// router.post('/market',protectRoute,Auth_Controller.marketTrade)
// localhost:3500/api/v1/auth/market
// router.post('/limit',protectRoute,Auth_Controller.limitOrder)
// localhost:3500/api/v1/auth/limit

// router.post('/open-orders/:symbol',protectRoute,Auth_Controller.openOrder)
// router.post('/cancel',protectRoute,Auth_Controller.cancelOrder)



export default router