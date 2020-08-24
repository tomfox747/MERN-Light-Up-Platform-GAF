
import startFactoryModel from './startFactorySchema';
import config from '../../config';
import jwt from 'jsonwebtoken';
import { PasswordInValid, GenericError } from '../../utils/errorHandling/errorHandler';


export const validatePassword = (incomingPassword) => {
    return new Promise(async (resolve, reject) => {

        const id = config.SUPER_USER_PASSWORD;
        const storedPassword = await startFactoryModel.findById(id).lean().exec().then((doc, err) => doc.password);

        if (storedPassword !== incomingPassword) {
            reject(new PasswordInValid('The Password Provided to authenticate is invalid!'))
        }

        resolve();
    })

}

export const generateAccessToken = ({ username }) => {

    return new Promise(async (resolve, reject) => {

        try {
            const id = config.JWT_TOKEN_DETAILS
            const { authSecret, authIssuer, authAudience } = await startFactoryModel.findById(id).lean().exec().then((doc, err) => doc);
            const accessToken = jwt.sign({ username: username }, authSecret, { expiresIn: config.JWT_TOKEN, audience: authAudience, issuer: authIssuer });
            resolve(accessToken);

        } catch (e) {
            reject(new GenericError(e.message, 'generic'))
        }
    });

}

