import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

//Load env vars
dotenv.config({ path: './config/config.env' });

//Load express
const app = express();

//Body Parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Start Server
const PORT = process.env.PORT || 5000;

//Mount routers
app.use('/api/users', require('./routes/users'));

//home
app.get('/', (req, res) => res.send('Express + TypeScript Server!'));

app.listen(PORT, () => {
  console.log(
    `⚡️[server]: Server is running in ${process.env.NODE_ENV} at https://localhost:${PORT}`
  );
});
