import {model, Schema, Document} from 'mongoose';
import {UserModelDocumentInterface} from "./UserModel";

export interface PaymentModelInterface {
    _id?: string
    walletAddress: string
    value: number
    timestamp: string
    user?: UserModelDocumentInterface
}

export type PaymentModelDocumentInterface = PaymentModelInterface & Document;

const PaymentSchema = new Schema<PaymentModelInterface>({
    walletAddress: {
        unique: true,
        required: true,
        type: String,
    },
    value: {
        required: true,
        type: Number,
    },
    timestamp: {
        required: true,
        type: String,
    },
    user: {
        required: true,
        ref: 'User',
        type: Schema.Types.ObjectId,
    },
})

export const PaymentModel = model<PaymentModelDocumentInterface>('Payment', PaymentSchema);
