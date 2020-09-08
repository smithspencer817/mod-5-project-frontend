import React, { Component } from 'react'
import { Divider, Input, Segment, Dropdown, Container } from 'semantic-ui-react'
import UserCard from './UserCard.js'

export default class QuestionSearch extends Component {

    render(){

        const skillOptions = this.props.allSkills.map(skill => ({
            key: skill.name,
            text: skill.name,
            value: skill.name
        }))

        const filteredUsers = this.props.questionSearchUsers.filter(user => user.id !== this.props.currentUser.id)

        return(
            <div>
                <Segment basic textAlign='center'>
                    <Input
                    
                    icon='search'
                    iconPosition='left'
                    placeholder='Search by username'
                    onChange={(e, data) => this.props.handleQuestionSearchbar(e, data)}
                    />

                    <Divider horizontal>or filter by skill</Divider>

                    <Dropdown onChange={(e, data) => this.props.handleQuestionSearchDropdown(e, data)} placeholder='Pick a skill' search selection options={skillOptions} />
                </Segment>
                <Container id='question-search-card-container'>
                    {filteredUsers.map(user => <UserCard user={user} key={user.id} handlePromptedUser={this.props.handlePromptedUser} />)}
                </Container>
            </div>
        )
    }
}