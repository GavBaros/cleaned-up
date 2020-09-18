import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(PORT, () => {
  console.log(`Node server running at: ${PORT}`);
});
