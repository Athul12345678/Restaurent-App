import express from 'express';
import userRequests from "../controller/controller.js";

const router = express.Router();
const userRequest = new userRequests();

router.post('/menus', userRequest.addMenu);
router.get('/menus', userRequest.getMenu);
router.post('/items', userRequest.addItem);
router.get('/items', userRequest.getItems);


export default router;