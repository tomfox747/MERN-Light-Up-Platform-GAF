import React, { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom'
import Axios from 'axios'



const AuthSuperUser = () => {
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("");
  const history = useHistory();
  const [authCode, setAuthCode] = useState(null)
  const [email, setEmail] = useState("")

  // looks for a code parameter in the url (this would be sent by the Oauth procedure)
  useEffect(() => {
    let params = (new URL(document.location)).searchParams;
    let code = params.get("code");
    if (code !== "") {
        setAuthCode(code)
    } else {
        console.log("no code found")
    }
  }, [])

  const setUserFunc = (e) => {
    setUser(e.target.value)
  }
  const setPasswordFunc = (e) => {
    setPassword(e.target.value)
  }
  const setEmailFunc = (e) =>{
    setEmail(e.target.value)
  }

  const handleRedirect = (pathname) => {
    history.push(pathname);
  }

  const sendAuthCode = (token) =>{
    const headers = {
      'Content-Type': 'application/json',
      'authorization': `bearer ${token}`
    }
    Axios.post('http://localhost:5001/send-auth-code', {
        authCode: authCode,
        email: email
    }, { headers: headers })
    .then(() => {
        alert("Authentication complete")
    })
    .catch((err) => {
        console.log("error when handling the authentication code => " + err)
    })
  }

  const authenticate = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:5001/start-factory', {
      username: user,
      password: password
    })
    .then((res) => {
      if(authCode !== null){
        if(res.data){
          sendAuthCode(res.data)
        }
      }else{
        if (res.data) {
          localStorage.setItem("token", res.data)
          handleRedirect('/CredentialsForm')
        }
      }
    })
    .catch((err) => {
      alert("incorrect password")
      setUser("")
      setPassword("")
    })
  }
  let buttonText = "Authenticate super user"
  if(email !== "" && authCode !== null){
    buttonText = "Send auth code"
  }

  return (
    <div className="row">
      <div className="col-12">
        <div>
          <p>Authenticate Super User, if sending auth code, add account email address and hit submit</p>
        </div>
        <form>
          <label>
            user:
            <input type="text" value={user} onChange={(e) => setUserFunc(e)} />
          </label><br/><br/>
          <label>
            password:
            <input type="text" value={password} onChange={(e) => setPasswordFunc(e)} />
          </label><br/><br/>
          <label>
            google account email: (only required for sending authentication code):
            <input type="text" value={email} onChange={(e) => setEmailFunc(e)}/>
          </label><br/>
          <input type="submit" value={buttonText} onClick={(e) => authenticate(e)} />
        </form>
      </div>
    </div>   
  )
}

export default withRouter(AuthSuperUser)