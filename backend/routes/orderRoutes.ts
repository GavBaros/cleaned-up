import express from 'express';
import { calculatePrice } from '../controllers/orders';
import { sanitiseValues } from '../middleware/sanitiseValues';

const orderRoutes = express.Router();

orderRoutes.use(sanitiseValues);

orderRoutes.post('/calculate_price', calculatePrice);

export default orderRoutes;
