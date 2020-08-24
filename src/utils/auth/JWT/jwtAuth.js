import jwt from 'jsonwebtoken';
import config from '../../../config';
import startFactoryModel from '../../../services/startFactory/startFactorySchema';
import { AuthenticationError } from '../../errorHandling/errorHandler';


const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {

        const token = authHeader.split(' ')[1];

        const id = config.JWT_TOKEN_DETAILS
        const accessTokenSecret = await startFactoryModel.findById(id).lean().exec().then((doc, err) => doc.authSecret);

        jwt.verify(token, accessTokenSecret, (err, payload) => {
            if (err) {
                res.status(400).send(new AuthenticationError(err.message))
                // TODO Thow New Error Here
                console.log('Auth Failure')

            } else {
                console.log('auth success')
                next();
            }
        })

    } else {
        // authentication  error 
        res.status(401).send(new AuthenticationError('Invalid Access token provided. Please ensure that the word bearer is in the header value before the token'))
    }

}


export default authenticateJWT