import dotenv from 'dotenv';
import './core/db';

import express from 'express';
import {UserCtrl} from './controllers/UserController';
import bodyParser from "body-parser";
import {loginValidation} from "./utils/validations";
import {passport} from './core/passport'

dotenv.config();
const app = express();
app.use(bodyParser.json())

app.post("/auth/login", loginValidation, UserCtrl.login);

app.post("/payment/top-up", passport.authenticate('jwt'), UserCtrl.createPayment)

app.get("/payment/top-up", passport.authenticate('jwt'), UserCtrl.showPayments)


app.listen(process.env.PORT, (): void => {
    console.log('SERVER RUN!');
});
