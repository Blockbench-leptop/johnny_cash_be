import passport from 'passport';
import {ExtractJwt, Strategy as JWTstrategy} from 'passport-jwt';
import {UserModel, UserModelInterface} from '../models/UserModel';

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET || '123',
            jwtFromRequest: ExtractJwt.fromHeader('token'),
        },
        async (payload: { data: UserModelInterface }, done): Promise<void> => {
            try {
                const user = await UserModel.findOne({email: payload.data.email}).exec()

                if (user) {
                    return done(null, user)
                }

                done(null, false)

            } catch (error) {
                done(error, false)
            }
        },
    ),
);

passport.serializeUser((user: UserModelInterface, done) => {
    done(null, user?._id)
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user) => {
        done(err, user)
    });
});

export {passport};
