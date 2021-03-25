import {model, Schema, Document} from 'mongoose';

export interface UserModelInterface {
    _id?: string;
    email: string;
    password: string;
    confirmHash?: string;
    confirmed?: boolean;
}

export type UserModelDocumentInterface = UserModelInterface & Document

const UserSchema = new Schema<UserModelInterface>({
    email: {
        unique: true,
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    confirmHash: {
        required: true,
        type: String,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
})

UserSchema.set('toJSON', {
    transform: function (_, obj) {
        delete obj.password;
        return obj;
    },
})

export const UserModel = model<UserModelDocumentInterface>('User', UserSchema)
