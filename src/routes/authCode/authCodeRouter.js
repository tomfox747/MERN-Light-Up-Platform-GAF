import express from 'express';
import authenticateJWT from '../../utils/auth/JWT/jwtAuth';
import { OAuth2Err } from '../../utils/errorHandling/errorHandler';
import {getToken} from '../../utils/auth/OAuth2/OAuth2'
import { getCredentialsByEmail, updateCredentials } from '../../services/credentials/credentialsService'

const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {

    try {
        if (!req.body.email) {
            throw new OAuth2Err('Email not provided in request body')
        }

        if (!req.body.authCode) {
            throw new OAuth2Err('AuthCode not provided in request body')
        }

        //get auth code from body
        const email = req.body.email
        const authCode = req.body.authCode

        //get credentials from database
        const credentials = await getCredentialsByEmail(email);

        //create google client object using credentials
        const [accessToken, refreshToken] = await getToken(credentials, authCode)
        //send tokens to database
        const query = {email: email}
        await updateCredentials(query, {accessToken: accessToken, refreshToken: refreshToken});
        res.status(200).send();

    } catch (error) {
        if (error.errorType && error.errorType === 'custom') {
            res.status(400).send(error);
            return;
        }

        res.status(500).send('Internal Server Error');
    }
})

export default router;