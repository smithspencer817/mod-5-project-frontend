import React, { Component } from 'react'
import QuestionPreview from './QuestionPreview'

export default class HomeQuestionsContainer extends Component {
    render(){
        return(
            <div>
                { this.props.allQuestions.map( question => <QuestionPreview question={question} key={question.id} />) }
            </div>
        )
    }
}