import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

const UserSignUp = ({ context }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  let history = useHistory();
  // let location = useLocation();

  const change = (event) => {
    const target = event.target.name;
    const value = event.target.value;
    if (target === 'firstName'){
      setFirstName(value)
    }
    if (target === 'lastName'){
      setLastName(value)
    }
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

    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    }

    context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          setErrors({ errors });
        } else {
          console.log(`${emailAddress} is successfully signed up and authenticated!`);
          context.actions.signIn(emailAddress, password)
            .then(() => {
              history.push('/courses');
            });
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
        <h2>Sign Up</h2>
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
          <label htmlFor="firstName">First Name</label>
          <input 
            id="firstName" 
            name="firstName" 
            type="test" 
            value={firstName}
            onChange={change} />
          <label htmlFor="lastName">Last Name</label>
          <input 
            id="lastName" 
            name="lastName" 
            type="test" 
            value={lastName}
            onChange={change} />
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
          <button className="button" type="submit">Sign Up</button>
          <button className="button button-secondary" onClick={cancel}>Cancel</button>
        </form>
        <p>Already have a user account? Click here to <a href="/signin">sign in</a>!</p>
      </div>
    </main>
  );
}

export default UserSignUp;