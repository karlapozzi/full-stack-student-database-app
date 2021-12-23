import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

const UserSignIn = ({ context }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  let history = useHistory();
  // let location = useLocation();

  const change = (event) => {
    const target = event.target.name;
    const value = event.target.value;
    if (target === 'emailAddress'){
      setEmailAddress(value)
    }
    if (target === 'password'){
      setPassword(value)
    }
  }

  const submit = (event) => {
    // const { from } = location.state || { from: { pathname: '/courses' } };
    event.preventDefault();

    context.actions.signIn(emailAddress, password)
      .then( (user) => {
        if (user === null) {
          setErrors(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          // console.log(from)
          history.push('/courses');
          console.log(`SUCCESS ${emailAddress} is now signed in!`);
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      })
  }

  const cancel = (event) => {
    event.preventDefault();
    history.push('/');
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {errors.length > 0 ? 
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
          :
          <div></div>
        }
        <form onSubmit={submit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input 
            id="emailAddress" 
            name="emailAddress" 
            type="email" 
            value={emailAddress}
            onChange={change} />
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            value={password}
            onChange={change} />
          <button className="button" type="submit">Sign In</button>
          <button className="button button-secondary" onClick={cancel}>Cancel</button>
        </form>
        <p>
          Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
        </p>
      </div>
    </main>
  );
}

export default UserSignIn;