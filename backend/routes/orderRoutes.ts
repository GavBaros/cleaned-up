import express from 'express';
import { calculatePrice } from '../controllers/orders';

const orderRoutes = express.Router();

orderRoutes.post('/calculate_price', calculatePrice);

export default orderRoutes;
