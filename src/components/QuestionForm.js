import React, { Component } from 'react';
import { Form, Grid } from 'semantic-ui-react'

export default class QuestionForm extends Component {

    render(){
        let promptedUser
        let promptedUserSkill

        if (this.props.promptedUser) {
            promptedUser = this.props.promptedUser
            promptedUserSkill = this.props.promptedUserSkill
        }

        return(
            <div id="question-form-container">
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <h1>What would you like to ask { promptedUser.name } about { promptedUserSkill.name }?</h1>
                            <Form onSubmit={(e) => this.props.handleQuestionSubmit(e)}>
                                <Form.TextArea name="question-input" label='Ask a question' placeholder='What would you like to know...' />
                                <Form.Button>Ask { promptedUser.name }</Form.Button>
                            </Form>
                        </Grid.Column>
                        <Grid.Column width={4}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}