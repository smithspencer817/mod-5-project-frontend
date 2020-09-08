import React, { Component } from 'react'
import { Grid, Header, Icon, Segment, Image, Message } from 'semantic-ui-react'
import ProfileQuestion from './ProfileQuestion.js'
import QuestionPreview from '../home/QuestionPreview.js'

export default class Profile extends Component {
    state = {
        posedQuestions: [],
        receivedQuestions: []
    }

    componentDidMount() {
        const user = this.props.user
        const receivedQuestions = this.props.allQuestions.filter(question => question.answerer.id === user.id)
        const posedQuestions = this.props.allQuestions.filter(question => question.questioner.id === user.id)
        this.setState({
            posedQuestions,
            receivedQuestions
        })
    }

    posedQuestionSearch = (e) => {

        const newArr = this.state.posedQuestions.filter(q => q.text.includes(e.target.value))
        
        if (e.target.value === "" ) {
            this.setState({
                posedQuestions: this.props.allQuestions.filter(question => question.questioner.id === this.props.user.id)
            })
        } else {
            this.setState({
                posedQuestions: newArr
            })
        }
    }

    receivedQuestionSearch = (e) => {

        const newArr = this.state.receivedQuestions.filter(q => q.text.includes(e.target.value))
        
        if (e.target.value === "" ) {
            this.setState({
                receivedQuestions: this.props.allQuestions.filter(question => question.answerer.id === this.props.user.id)
            })
        } else {
            this.setState({
                receivedQuestions: newArr
            })
        }
    }

    render(){
        const user = this.props.user
        const averageRating = (user.received_reviews.map(r => r.rating).reduce((a,b) => a + b)) / user.received_reviews.length
        return(
            <Grid>

                <Grid.Row className='profile-header'>
                    <Grid.Column width={8}>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='small' circular floated="right"/>
                    </Grid.Column>
                    <Grid.Column width={8} verticalAlign="middle">
                        <Header as='h2'><Icon name='user' size='small' />{user.name}</Header>
                        <Header as='h5' className="profile-icon"><Icon name='question circle outline' size='small' />Questions Asked: {user.posed_questions.length}</Header>
                        <Header as='h5' className="profile-icon"><Icon name='share square outline' size='small' />Answers Given: {user.answers.length}</Header>
                        <Header as='h5' className="profile-icon"><Icon name='thumbs up outline' size='small' />Average Rating: {averageRating}</Header>
                    </Grid.Column>
                </Grid.Row>
                
                <Grid.Row className="profile-search-bars">
                    <Grid.Column width={2}>
                    </Grid.Column>
                    <Grid.Column width={2} verticalAlign="middle">
                        <Header as='h3' floated="right">You asked</Header>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <div class="ui search">
                            <div class="ui icon input">
                                <input class="prompt" type="text" placeholder="your questions..." onChange={(e) => this.posedQuestionSearch(e)}></input>
                                <i class="search icon"></i>
                            </div>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                    </Grid.Column>
                    <Grid.Column width={2} verticalAlign="middle">
                        <Header as='h3' floated="right">You answered</Header>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <div class="ui search">
                            <div class="ui icon input">
                                <input class="prompt" type="text" placeholder="your answers..." onChange={(e) => this.receivedQuestionSearch(e)}></input>
                                <i class="search icon"></i>
                            </div>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={2}>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Segment style={{overflow: 'auto', maxHeight: 440 }} className="questions-container">
                        {
                            this.state.posedQuestions.length === 0 ?
                            <Message color="red">No Questions Found...</Message>
                            :
                            this.state.posedQuestions.map(question => 
                            <QuestionPreview question={question} currentUser={this.props.user} handleReviewSubmit={this.props.handleReviewSubmit}/>
                            )
                        }
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={2}>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Segment style={{overflow: 'auto', maxHeight: 440 }} className="questions-container">
                        {
                            this.state.receivedQuestions.length === 0 ?
                            <Message color="red">No Questions Found...</Message>
                            :
                            this.state.receivedQuestions.map(question => 
                            <ProfileQuestion
                                question={question}
                                handleAnswerSubmit={this.props.handleAnswerSubmit}
                                handleAnswerDelete={this.props.handleAnswerDelete}
                                key={question.id}
                            />
                            )
                        }
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={2}>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        )
    }
}