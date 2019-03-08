import React, { Component } from 'react';

class SignUp extends Component {
  render() {
    return (
      <div className="App">
        {/*
          <form class='signup-form'>
            <div>
              <label for="first-name">First name</label>
              <input placeholder='First Name' type="text" name='first-name' id='first-name' />
            </div>
            <div>
              <label for="last-name">Last name</label>
              <input type="text" name='last-name' id='last-name' placeholder='Last Name' />
            </div>
            <div>
              <label for="username">Email</label>
              <input type="text" name='username' id='username' />
            </div>
            <div>
              <label for="password">Password</label>
              <input type="password" name='password' id='password' />
            </div>
            <a href="www.facebook.com"><button type='submit'>Sign Up</button></a>
        </form>
        */}
        <form className='signup-form'>
          <div>
            <label htmlFor="first-name">First name</label>
            <input placeholder='First Name' type="text" name='first-name' id='first-name' />
          </div>
          <div>
            <label htmlFor="last-name">Last name</label>
            <input type="text" name='last-name' id='last-name' placeholder='Last Name' />
          </div>
          <div>
            <label htmlFor="username">Email</label>
            <input type="text" name='username' id='username' />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' id='password' />
          </div>
          {/*<a href="www.facebook.com"><button type='submit'>Sign Up</button></a>*/}
          <a href="/Home">Sign Up</a>
      </form>sdf

      </div>
    );
  }
}

export default SignUp;
