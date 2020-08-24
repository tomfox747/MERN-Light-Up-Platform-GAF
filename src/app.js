import express from 'express';
//TODO remove health check to eliminate chance of BACK DOOR RAMMING
//TODO add access token expiration date
import startFactoryRouter from './routes/startFactory/startFactoryRouter';
import credentialsRouter from './routes/credentials/credentialsRouter';
import authCodeRouter from './routes/authCode/authCodeRouter'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());
app.use("/start-factory", startFactoryRouter);
app.use("/credentials", credentialsRouter);
app.use("/send-auth-code", authCodeRouter)

export default app;