import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class UserCard extends Component {
    render(){
        const user = this.props.user
        return(
            <div className="user-card">
                <Card>
                    <Image as={Link} to="/form" onClick={() => this.props.handlePromptedUser(user)} src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                    <Card.Content>
                    <Card.Header>{user.username}</Card.Header>
                    <Card.Meta>
                        Skills: {user.skills.map(skill => skill.name + " ")}
                    </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <Icon name='question circle outline' />
                        {user.answers.length} answers given
                    </Card.Content>
                </Card>
            </div>
        )
    }
}