import express from 'express';
const router = express.Router();
import userController from '../controllers/user.controller.js'

router.get('/', userController.getAllUsers);
// router.get('/singleUser', userController.getUser); for query params optional 
router.get('/:id', userController.getUser); // for params mandaotry 
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);

export default router;
