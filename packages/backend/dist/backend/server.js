"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const app = express_1.default();
const PORT = 4000;
app.use(cors_1.default({ origin: 'http://localhost:3000' }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//Routes for each business area, in this case, /orders
app.use('/orders', orderRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Node server running at: ${PORT}`);
});
