import React, { Component } from 'react';
import { Button, Form, Grid, Header, Icon } from 'semantic-ui-react'

export default class Login extends Component {
    render(){
        return(
            <Grid className="login-container">
                <Grid.Row>
                    <Grid.Column width={6}>
                    </Grid.Column>
                    <Grid.Column textAlign="center" width={4}>
                        <Header as='h1' icon>
                            <Icon name='comments outline' />
                            Untitled Question App
                            <Header.Subheader>
                            seek and give expert advice
                            </Header.Subheader>
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={6}>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Form onSubmit={(e) => this.props.handleLogin(e)}>
                            <Form.Field>
                            <label>Username</label>
                            <input id="username-input" name="username" autoComplete="off"/>
                            </Form.Field>
                            <Form.Field>
                            <label>Password</label>
                            <input id="password-input" name="password" autoComplete="off" type="password"/>
                            </Form.Field>
                            <Button type='submit' color="teal">Sign In</Button><Button color="black">Sign Up</Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column width={6}>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    
                </Grid.Row>
            </Grid>
        )
    }
}