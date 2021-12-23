import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const SignOut = ({ context }) => {
  useEffect(() => context.actions.signOut());
   
  return (
    <Redirect to="/" />
  );
}

export default SignOut;
