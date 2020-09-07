import React, { Component } from 'react'
import { Grid, Segment, GridColumn, Header } from 'semantic-ui-react'
import HomeQuestionsContainer from './HomeQuestionsContainer.js'

export default class HomePageContent extends Component {
    render(){
        return(
            <div>
                <Grid>
                    <Grid.Row className='home-header'>
                        <GridColumn width={4}>

                        </GridColumn>
                        <GridColumn width={8}>
                            <Header as='h1'>Question Feed</Header>
                        </GridColumn>
                        <GridColumn width={4}>
                            
                        </GridColumn>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Segment style={{overflow: 'auto', maxHeight: 510}} className="home-questions-container">
                                <HomeQuestionsContainer allQuestions={this.props.allQuestions} currentUser={this.props.currentUser} handleReviewSubmit={this.props.handleReviewSubmit}/>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={4}>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}