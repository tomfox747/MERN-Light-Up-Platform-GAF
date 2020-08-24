import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useHistory, withRouter } from 'react-router-dom'

const CredentialsForm = () => {
    const [pageName, setPageName] = useState("")
    const [email, setEmail] = useState("exampleEmail@email.com")
    const [password, setPassword] = useState("examplePassword")
    const [clientId, setClientId] = useState("exampleClientId")
    const [clientSecret, setClientSecret] = useState("exampleClientSecret")
    const [redirectUrl, setRedirectUrl] = useState("exampleUrl")
    const history = useHistory()

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            history.push('/')
        }
    }, [])

    const setPageNameFunc = (e) =>{
        setPageName(e.target.value)
    }
    const setEmailFunc = (e) => {
        setEmail(e.target.value)
    }
    const setPasswordFunc = (e) => {
        setPassword(e.target.value)
    }
    const setIDFunc = (e) => {
        setClientId(e.target.value)
    }
    const setSecretFunc = (e) => {
        setClientSecret(e.target.value)
    }
    const setRedirectFunc = (e) => {
        setRedirectUrl(e.target.value)
    }

    const storeData = (e) => {
        e.preventDefault()
        const headers = {
            'Content-Type': 'application/json',
            'authorization': `bearer ${localStorage.getItem("token")}`
        }

        sessionStorage.setItem("email", email)

        let dataObject = {
            pageName:pageName,
            email: email,
            password: password,
            clientId: clientId,
            clientSecret: clientSecret,
            redirectUrl: redirectUrl
        }
        //send data object to server
        Axios.post('http://localhost:5001/credentials', {
            credentials: dataObject,
        }, { headers: headers })
            .then((res) => {
                window.location.replace(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <p>Credentials Form</p>
            <form>
                <label>
                    Page name:
                    <input type="text" value={pageName} onChange={(e) => setPageNameFunc(e)}/>
                </label>
                <label>
                    Email:
                    <input type="text" value={email} onChange={(e) => setEmailFunc(e)} />
                </label><br />
                <label>
                    Password:
                    <input type="text" value={password} onChange={(e) => setPasswordFunc(e)} />
                </label><br />
                <label>
                    ClientId:
                    <input type="text" value={clientId} onChange={(e) => setIDFunc(e)} />
                </label><br />
                <label>
                    ClientSecret:
                    <input type="text" value={clientSecret} onChange={(e) => setSecretFunc(e)} />
                </label><br />
                <label>
                    redirectUrl:
                    <input type="text" value={redirectUrl} onChange={(e) => setRedirectFunc(e)} />
                </label><br />
                <input type="submit" onClick={(e) => storeData(e)}></input>
            </form>
        </div>
    )
}

export default withRouter(CredentialsForm)