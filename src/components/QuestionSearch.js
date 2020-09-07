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

        return(
            <div>
                <Segment basic textAlign='center'>
                    <Input
                    action={{ color: 'blue', content: 'Search' }}
                    icon='search'
                    iconPosition='left'
                    placeholder='Search by username'
                    onChange={(e, data) => this.props.handleQuestionSearchbar(e, data)}
                    />

                    <Divider horizontal>filter by skill</Divider>

                    <Dropdown onChange={(e, data) => this.props.handleQuestionSearchDropdown(e, data)} placeholder='Skill' search selection options={skillOptions} />
                </Segment>
                <Container id='question-search-card-container'>
                    {this.props.questionSearchUsers.map(user => <UserCard user={user} key={user.id} handlePromptedUser={this.props.handlePromptedUser} />)}
                </Container>
            </div>
        )
    }
}