import React from 'react';

//Create header element for all pages
const Header = ({context}) => {
  const authUser = context.authenticatedUser;
  
  return (

    <header>
    <div className="wrap header--flex">
        <h1 className="header--logo"><a href="/">Courses</a></h1>
        <nav>
        {/* if a user is signed in, show welcome and sign out, otherwise show sign up and sign in */}
        {authUser ?
          <ul className="header--signedin">
              <li>Welcome, {authUser.firstName}!</li>
              <li><a href="/signout">Sign Out</a></li>
          </ul>
          :
          <ul className="header--signedout">
              <li><a href="/signup">Sign Up</a></li>
              <li><a href="/signin">Sign In</a></li>
          </ul>
          }
        </nav>
    </div>
</header>
  );

}

export default Header;