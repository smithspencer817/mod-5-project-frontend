import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class UserCard extends Component {
    render(){
        const user = this.props.user
        const averageRating = (user.received_reviews.map(r => r.rating).reduce((a,b) => a + b)) / user.received_reviews.length
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
                        <Icon className="user-card-icon" name='question circle outline' />
                        {user.posed_questions.length}
                        <Icon className="user-card-icon" name='thumbs up outline' />
                        {averageRating}
                        <Icon className="user-card-icon" name="share square outline" />
                        {user.answers.length}
                    </Card.Content>
                </Card>
            </div>
        )
    }
}