import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

//Create and show sign in form
const UserSignIn = ({ context }) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  let history = useHistory();
  let location = useLocation();

  //As form fields are filled in, update the corresponding state variables
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

  //When the form is submitted, authorize user via API call
  const submit = (event) => {
    //If applicable, this will remember the previous path the user was at before being sent to the sign up form 
    const { from } = location.state || { from: { pathname: '/courses' } };
    event.preventDefault();

    context.actions.signIn(emailAddress, password)
      .then( (user) => {
        //If no user is returned from the API, show a sign in error, otherwise send them to their previous URL/location (or /courses)
        if (user === null) {
          setErrors(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
        } else {
          history.push(from);
          // console.log(`SUCCESS ${emailAddress} is now signed in!`);
        }
      })
      .catch(err => {
        console.log(err);
        history.push('/error');
      })
  }

  //When cancel is clicked, go back to index/courses
  const cancel = (event) => {
    event.preventDefault();
    history.push('/');
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        {/* If errors are returned when trying to sign in, they'll appear here */}
        {context.actions.showErrors(errors)}
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
        <p>Don't have a user account? Click here to <a href="/signup">sign up</a>!</p>
      </div>
    </main>
  );
}

export default UserSignIn;