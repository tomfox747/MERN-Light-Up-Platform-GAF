import credentialsModel from './credentialsSchema';
import { DatabaseError } from '../../utils/errorHandling/errorHandler';

export const createCredentials = credentialObject => {

    let user = new credentialsModel(credentialObject);
    return new Promise(async (success, fail) => {

        try {
            await user.save()
            success()

        } catch (e) {
            fail(new DatabaseError('Credentials not uploaded'))
        }
    });
};

export const updateCredentials = (query, update) => {

    return new Promise(async (success, fail) => {

        try {
            const credentials = await credentialsModel.findOneAndUpdate(query, update, {new: true});

            if (!credentials || credentials === null){
                fail(new DatabaseError('Query not found in database'))
            }
            success();

        } catch (e) {
            fail(new DatabaseError('Credentials not uploaded'));
        }
    });

}


export const getCredentialsByEmail = email => {

    return new Promise(async (success, fail) => {
        try {
            const credentials = credentialsModel.findOne({ email: email }).lean().exec().then((doc, err) => ({ clientId: doc.clientId, clientSecret: doc.clientSecret, redirectUrl: doc.redirectUrl }));
             success(credentials);

        } catch (e) {
            fail(new DatabaseError('Credentials not found in database'))
        }
    })

}
