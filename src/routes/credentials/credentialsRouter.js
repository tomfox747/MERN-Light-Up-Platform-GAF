import express from 'express';
import authenticateJWT from '../../utils/auth/JWT/jwtAuth';
import { createCredentials } from '../../services/credentials/credentialsService';
import { getAuthUrl } from '../../utils/auth/OAuth2/OAuth2';

const router = express.Router();

router.post('/', authenticateJWT, async (req, res) => {

    try {
        const credentials = req.body.credentials;
        await createCredentials(credentials);
        const url = await getAuthUrl(credentials);
        res.status(200).send(url);

    } catch (error) {

        if (error.errorType && error.errorType === 'custom') {
            res.status(400).send(error);
            return;
        }

        res.status(500).send('Internal Server Error');
    }


});

export default router;
