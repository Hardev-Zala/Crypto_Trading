import express from "express"
import AdminController from "../controller/admin.Controller.js"

const router = express.Router()

router.get('/users',AdminController.fetchAllUser)
// Update a user
router.put("/users/:userId", AdminController.updateUser);
// Delete a user
router.delete("/users/:userId", AdminController.deleteUser);

router.get('/fetch-trades',AdminController.fetchAllOptions)
router.get('/fetch-bank-details',AdminController.fetchAllUserBankDeatils)
router.get("/fetch-analytics", AdminController.fetchAnalyticsData); 
// full endpoint will be like that., http://localhost:3500/api/v1/admin/... 

export default router
