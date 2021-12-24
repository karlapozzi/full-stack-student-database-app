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

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {return { authenticatedUser: {...user, ...{password} }}});
      Cookies.set('authenticatedUser', JSON.stringify(this.state.authenticatedUser), { expires: 1 });

    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }

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

