import express from 'express';
import {Result, ValidationError, validationResult} from "express-validator";

import {UserModel, UserModelInterface} from '../models/UserModel';
import {PaymentModel, PaymentModelInterface} from '../models/PaymentModel';
import createJWToken from "../utils/createJWToken";

class UserController {
    login(req: express.Request, res: express.Response): void {
        const postData: { email: string; password: string } = {
            email: req.body.email,
            password: req.body.password,
        }

        const errors: Result<ValidationError> = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()})
        } else {

            UserModel.findOne({email: postData.email}, (err, user: UserModelInterface) => {

                if (err || !user) {
                    return res.status(404).json({
                        message: "User not found",
                    })
                }

                if ((postData.password === user.password)) {

                    const token = createJWToken(user)

                    res.json({
                        status: "success",
                        token,
                    })

                } else {
                    res.status(403).json({
                        status: "error",
                        message: "Incorrect password or email",
                    })
                }
            })
        }
    }

    createPayment(req: express.Request, res: express.Response): void {
        const postData: { walletAddress: string, value: number, timestamp: string } = {
            walletAddress: req.body.walletAddress,
            value: req.body.value,
            timestamp: req.body.timestamp,
        }

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(422).json({errors: errors.array()});
        } else {
            const user = new PaymentModel(postData)

            user.save().then((obj: PaymentModelInterface) => {
                res.status(500).json({
                    status: "error",
                    obj: res.json(obj)
                })
            })
        }
    }

    async showPayments(req: express.Request, res: express.Response): Promise<void> {
        try {
            const params = {
                start: req.query.start,
                and: req.query.and
            }

            const filter = await UserModel.find({
                createdAt: {
                    $gte: params.start,
                    $lte: params.and
                }
            })

            res.status(200).json({
                status: 'success',
                body: filter
            })
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    }
}

export const UserCtrl = new UserController();
