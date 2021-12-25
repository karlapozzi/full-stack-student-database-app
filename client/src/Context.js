import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {

  constructor() {
    super();
    this.data = new Data();
    this.cookie = Cookies.get('authenticatedUser');
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null,
    }
  }

  render() {

    const value = {
      authenticatedUser: this.state.authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut, 
        showErrors: this.showErrors
      }
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  //Function to handle user sign in that verifies user email and password via the API
  //If the user is verified/authorized, store user info in the authenticatedUser state
  //This function exists in the context so that all other components will be able to access the user state
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      //Save password with authenticatedUser info
      this.setState(() => {return { authenticatedUser: {...user, ...{password} }}});
      //Save authenticatedUser info in a cookie (this isn't secure, but I'll learn more about that later!)
      Cookies.set('authenticatedUser', JSON.stringify(this.state.authenticatedUser), { expires: 1 });

    }
    return user;
  }

  //Function to handle user sign out
  //Sets authenticated user sign out to null and removes cookies
  //This function exists in the context so that the authenticatedUser state can be updated (and therefore sent to all components too)
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }

  //Function to handle validation errors on multiple forms (sign in, sign up, create course, and update course)
  //This function exists in the context so that the code doesn't have to be repeated multiple places
  showErrors = (errors) => {
    if (errors.errors) {
      return (
        <div className="validation--errors">
          <h3>Validation Errors</h3>
          <ul>
            {errors.errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      )
    }
  }

}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

