import { google } from 'googleapis'
const OAuth2 = google.auth.OAuth2


/********************************
 * createoAuthClient, this may need to be updated to in the future to alter based on user that is logged in
 */
const getOAuthClient = ({ clientId, clientSecret, RedirectUrl }) => {
    const testUrl = "http://e43c5728.ngrok.io"
    return new OAuth2(clientId, clientSecret, testUrl)
}


/********************************
 * generate oauth login url
 */
export const getAuthUrl = (credentials) => {
    const oauth2Client = getOAuthClient(credentials)
    const scopes = ['https://www.googleapis.com/auth/youtube.upload', 'https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/youtube.readonly']

    return new Promise((resolve, reject) => {
        try {
            const url = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes,
                approval_prompt: 'force',
            })
            resolve(url)

        } catch (err) {
            reject(err)
        }
    })
}


/*******************************
 * generate an access token for the url response code
 */
export const getToken = (credentials, code) => {
    var oauth2Client = getOAuthClient(credentials)

    return new Promise(async (resolve, reject) => {
        try {
            let tokens = await oauth2Client.getToken(code)
            let accessToken = tokens.tokens.access_token
            let refreshToken = tokens.tokens.refresh_token
            resolve([accessToken, refreshToken])
        } catch (err) {
            reject(err)
        }
    })
}