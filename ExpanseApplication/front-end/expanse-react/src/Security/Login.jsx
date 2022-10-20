import { useRef, useState, useEffect } from 'react';
import axios from './axios';
import BackgroundImage from '../assets/logImage.jpg';


const LOGIN_URL = '/login';

const backgroundStyle = {
  backgroundImage: `url(${BackgroundImage})`,  
  height: '100vh',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover'
}

const registrationBoxStyle = {
  width: '446px',
  background: '#FFFFFF',
  borderRadius: '15px',
  display: 'block',
  flexDirection: 'row',
  alignItems: 'flex-start',
  padding: '48px',
  gap: '8px',
  height: '440px',
  margin: 'auto',
  position: 'relative',
  top: '20%',
  overflow: 'hidden',
  left: '25%'
}

const titleStyle = {
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: '600',
  fontSize: '30px',
  lineHeight: '137%',
  textAlign: 'center',
  letterSpacing: '-0.8px',
  color: '#172B4D',
  marginBottom: '30px'
}

const inputFieldStyle = {
  fontFamily: 'Open Sans',
  padding: '0px 0px 0px 14px',
  height: '50px',
  borderRadius: '8px',
  border: '1px solid #E2E8F0',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '150%',
  color: '#A0AEC0',
}

const buttonStyle = {
  fontFamily: 'Open Sans',
  padding: '6px 16px',
  background: '#3E79E5',
  borderRadius: '8px',
  marginTop: '30px',
  color: '#FFFF',
  border: '0px',
  fontWeight: 500,
  fontSize: '18px'
}

const messageBoxStyling = {
  fontFamily: 'Open Sans',
  backgroundColor: '#FFFF',
  color: '#AD1F1F',
  fontSize: '15px'
}



const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    
      setUser('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else if (err.response?.status === 403) {
        setErrMsg('Invalid username or password')
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }

  return (
    <div style={backgroundStyle}>
      {success ? (
        <section style={registrationBoxStyle}>
          <h1 style={titleStyle}>You are logged in!</h1>
          <br />
          <p style={messageBoxStyling}>
            <a style={{ fontFamily: 'Open Sans', color: '#5E72E4', textDecoration: 'none', fontWeight: 600, fontSize: '16px', paddingLeft: '10px'}} href="/home">Go to Home</a>
          </p>
        </section>
      ) : (
        <section style={registrationBoxStyle}>
          <p style={messageBoxStyling} ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1 style={titleStyle}>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <input
              style={inputFieldStyle}
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              placeholder='Username'
              required
            /><br />

            <input
              style={inputFieldStyle}
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              placeholder='Password'
            />
            <button style={buttonStyle}>Sign In</button>
          </form>
          <p style={{fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 400, textAlign: 'center'}}>
            Need an Account?<br />
            <span className="line">
              {/*put router link here*/}
              <a style={{ fontFamily: 'Open Sans', color: '#5E72E4', textDecoration: 'none', fontWeight: 600, fontSize: '16px', paddingLeft: '10px'}} href="./register">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </div>
  )
}

export default Login