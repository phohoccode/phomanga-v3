import express from "express"
import { createNotification, deteleNotification, getAllNotifications, updateNotification } from "../controllers/notificationController"

const route = express.Router()

route.post('/get-all-notifications', getAllNotifications)
route.post('/create-notification', createNotification)
route.post('/delete-notification', deteleNotification)
route.post('/update-notification', updateNotification)

export default route