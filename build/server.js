"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
//Load env vars
dotenv_1.default.config({ path: './config/config.env' });
//Load express
const app = express_1.default();
//Body Parser
app.use(express_1.default.json());
//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan_1.default('dev'));
}
//Start Server
const PORT = process.env.PORT || 5000;
//Mount routers
app.use('/api/users', require('./routes/users'));
//home
app.get('/', (req, res) => res.send('Express + TypeScript Server!'));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running in ${process.env.NODE_ENV} at https://localhost:${PORT}`);
});
