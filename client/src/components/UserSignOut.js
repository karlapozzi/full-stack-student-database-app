import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

//Create a component to handle user sign out
const SignOut = ({ context }) => {
  useEffect(() => context.actions.signOut());
   
  return (
    <Redirect to="/" />
  );
}

export default SignOut;
