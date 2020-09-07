import React, { Component } from 'react';
import { Segment, Form, Button, Header, Grid } from 'semantic-ui-react';

export default class ProfileQuestion extends Component {
    render(){
        const question = this.props.question
        return(
            <div className="profile-question">
                <Segment>
                    <Segment.Group>
                        <Segment><Header as="h5">{question.questioner.username} asked you...</Header></Segment>
                        <Segment><Header as="h2">{question.text}</Header></Segment>
                        <Segment.Group>
                        {question.answers.map(answer => 
                            <Segment>
                                <Grid>
                                    <Grid.Row>
                                    <Grid.Column width={13}>
                                        <em>{answer.text}</em>
                                    </Grid.Column>
                                    <Grid.Column width={1}>
                                    </Grid.Column>
                                    <Grid.Column width={1} verticalAlign="middle">
                                        <Button onClick={() => this.props.handleAnswerDelete(answer)} inverted color="red" size='mini' floated="right">X</Button>
                                    </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment> 
                        )}
                        </Segment.Group>
                        <Segment>
                            <Form onSubmit={(e) => this.props.handleAnswerSubmit(e, this.props.question)}>
                                <Form.Field>
                                    <label>Respond to {question.questioner.name}</label>
                                    <input placeholder="Answer here..." />
                                </Form.Field>
                                <Button type='submit'>Respond</Button>
                            </Form>
                        </Segment>
                    </Segment.Group>
                </Segment>
            </div>
        )
    }
}