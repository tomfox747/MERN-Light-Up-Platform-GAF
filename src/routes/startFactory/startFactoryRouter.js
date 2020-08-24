import express from 'express';

import { validatePassword, generateAccessToken } from '../../services/startFactory/startFactoryService';

const router = express.Router();

router.post("/", async (req, res) => {

    try {
        await validatePassword(req.body.password);
        // create JWT access token 
        const token = await generateAccessToken(req.body.username);
        res.status(200).json(token)

    } catch (error) {

        if (error.errorType && error.errorType === 'custom') {
            res.status(400).send(error);
            return;
        }

        res.status(500).send('Internal Server Error');
    }
});


export default router;