import express from 'express';
const router = express.Router();
import leaveController from '../controllers/leave.controller.js'

router.post('/requestLeave', leaveController.requestLeave);
router.get('/leaveDetails', leaveController.getLeaveDetails);
router.put('/updateStatus/:id', leaveController.updateLeaveStatus)

export default router;