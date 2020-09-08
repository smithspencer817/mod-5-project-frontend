import React, { Component } from 'react';

export default class Login extends Component {
    render(){
        return(
            <div id="login-container">
                <h1 id="login-header">Sign In Page</h1>
                <form onSubmit={(e) => this.props.handleLogin(e)}>
                    <label htmlFor="username-input">Username </label>
                    <input type="text" id="username-input" name="username"></input>
                    <br></br>
                    <br></br>
                    <label htmlFor="password-input">Password </label>
                    <input type="text" id="password-input" name="password"></input>
                    <br></br>
                    <br></br>
                    <button>Sign Up</button> or <button type="submit">Sign In</button>
                </form>
            </div>
        )
    }
}