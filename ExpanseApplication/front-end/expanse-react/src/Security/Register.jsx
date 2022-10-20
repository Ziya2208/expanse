import { useRef, useState, useEffect } from "react";
import "./security.css";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './axios';
import BackgroundImage from '../assets/registerbackground.jpg';


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
  height: '480px',
  margin: 'auto',
  position: 'relative',
  top: '10%',
  overflow: 'hidden'
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
  color: '#A0AEC0'
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
  color: '#8392AB',
  fontSize: '15px'
}


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response))
      setSuccess(true);
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed')
        console.log(err)
      }
      errRef.current.focus();
    }
  }

  return (
    <div style={backgroundStyle}>
      {success ? (
        <section style={registrationBoxStyle}>
          <h1>Success!</h1>
          <p>
            <a style={{ fontFamily: 'Open Sans', color: '#5E72E4', textDecoration: 'none', fontWeight: 600, fontSize: '16px', paddingLeft: '10px'}} href="/">Sign In</a>
          </p>
        </section>
      ) : (
        <section style={registrationBoxStyle}>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <h1 style={titleStyle}>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              <FontAwesomeIcon icon={faCheck} className={validName ? "hide" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              placeholder="Username"
              style={inputFieldStyle}
              placeholderColor='#A0AEC0'
            />
            <p style={messageBoxStyling} id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.<br />
              Must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
            </p>


            <label htmlFor="password">
              <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              placeholder="Password"
              style={inputFieldStyle}
            />
            <p style={messageBoxStyling} id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>


            <label htmlFor="confirm_pwd">
              <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              placeholder="Confirm Password"
              style={inputFieldStyle}
            />
            <p style={messageBoxStyling} id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button style={buttonStyle} disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
          </form>
          <p style={{fontFamily: 'Open Sans', fontSize: '14px', fontWeight: 400, textAlign: 'center'}}>
            Already have an account?   
            <span className="line">
              <a style={{ fontFamily: 'Open Sans', color: '#5E72E4', textDecoration: 'none', fontWeight: 600, fontSize: '16px', paddingLeft: '10px'}} href="./login">   Sign In</a>
            </span>
          </p>
        </section>
      )}
      </div>
  )
}

export default Register