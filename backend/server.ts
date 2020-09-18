import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import orderRoutes from './routes/orderRoutes';

const app = express();
const PORT = 4000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes for each business area, in this case, /orders
app.use('/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Node server running at: ${PORT}`);
});
