import React, { Component, useState } from 'react';
import Login from './components/Login';
import HomePageContent from './components/home/HomePageContent'
import NavBar from './components/NavBar'
import Profile from './components/profile/Profile.js'
import QuestionSearch from './components/QuestionSearch'
import QuestionForm from './components/QuestionForm'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";



class App extends Component {

  state = {
    // all
    user: null,
    allQuestions: [],
    allSkills: [],
    allUsers: [],
    // question form
    promptedUser: null,
    promptedUserSkill: '',
    questionSearchUsers: []
  }

  componentDidMount() {

    Promise.all([
      fetch('http://localhost:3000/checkuser', {credentials: 'include'}),
      fetch('http://localhost:3000/questions'),
      fetch('http://localhost:3000/skills'),
      fetch('http://localhost:3000/users')
    ])
    .then(([checkUser, questions, skills, users]) => {
      return Promise.all([checkUser.json(), questions.json(), skills.json(), users.json()])
    })
    .then(([checkUser, questions, skills, users]) => {
      this.setState({
        user: checkUser,
        allQuestions: questions,
        allSkills: skills,
        allUsers: users,
        questionSearchUsers: [...users],
        promptedUser: checkUser
      })
    })
  }

  handleLogin = (e) => {
    e.preventDefault();

    const login = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    fetch('http://localhost:3000/login', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
    .then(res => res.json())
    .then(user => {
      this.setState({user})
      this.props.history.push('/home')
    })
  }

  // QUESTION FORM FUNCTIONS
  handleQuestionSearchDropdown = (e, data) => {

    const filterSkill = this.state.allSkills.filter(skill => skill.name === data.value)[0]

    const filteredUsers = this.state.allUsers.filter(
      user => user.skills.map(
        skill => skill.id).includes(filterSkill.id)
      )

    this.setState({
      questionSearchUsers: filteredUsers,
      promptedUserSkill: filterSkill
    })
  }

  handleQuestionSearchbar = (e, data) => {
    let filteredUsers = this.state.questionSearchUsers.filter(user => user.username.includes(data.value))
  
    if (data.value === "") {
      this.setState({
        questionSearchUsers: [...this.state.allUsers]
      })
    } else {
      this.setState({
        questionSearchUsers: filteredUsers
      })
    }
  }

  handlePromptedUser = (user) => {
    this.setState({
      promptedUser: user
    })
  }

  handleQuestionSubmit = (e) => {
    e.preventDefault();

    const data = {
      text: e.target[0].value,
      questioner_id: this.state.user.id,
      answerer_id: this.state.promptedUser.id
    }

    fetch('http://localhost:3000/questions', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(question => {
      console.log(question)
      console.log(this.state.allQuestions)
      this.setState({
        allQuestions: [question, ...this.state.allQuestions]
      })
    })
  }

  handleAnswerSubmit = (e, question) => {
    e.preventDefault();

    const answer = {
      text: e.target[0].value,
      user_id: this.state.user.id,
      question_id: question.id
    }

    e.target.reset();

    fetch('http://localhost:3000/answers', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answer)
    })
    .then(res => res.json())
    .then(answer => {
      question.answers.push(answer)
      const filteredQuestions = this.state.allQuestions.map(q => q.id === question.id ? question : q)
      this.setState({
        allQuestions: filteredQuestions
      })
    })
  }

  handleAnswerDelete = (answer) => {
    const question = this.state.allQuestions.filter(question => question.answers.map(answer => answer.id).includes(answer.id))[0]
    const filteredAnswers = question.answers.filter(a => a.id !== answer.id)
    const filteredQuestions = this.state.allQuestions.map(q => {
      if (q.id === question.id) {
        q.answers = filteredAnswers
        return q
      } else {
        return q
      }
    })
    
    this.setState({
      allQuestions: filteredQuestions
    })
    
    fetch(`http://localhost:3000/answers/${answer.id}`, {
      method: 'DELETE'
    })
  }

  handleReviewSubmit = (e, answerer) => {
    e.preventDefault();

    const review = {
      rating: e.target[0].value,
      review_receiver_id: answerer.id,
      review_giver_id: this.state.user.id
    }

    fetch('http://localhost:3000/reviews', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(review)
    })
    .then(res => res.json())
    .then(review => console.log(review))
  }

  logOut = () => {
    this.setState({
      user: null
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.user ? 
          <Switch>
            <Route path="/login">
              <Login handleLogin={this.handleLogin}/>
            </Route>
            <Route path="/home">
              <NavBar />
              <HomePageContent 
                allQuestions={this.state.allQuestions}
                currentUser={this.state.user}
                handleReviewSubmit={this.handleReviewSubmit}
              />
            </Route>
            <Route exact path="/profile">
              <NavBar />
              <Profile 
                user={this.state.user}
                allQuestions={this.state.allQuestions}
                handleAnswerSubmit={this.handleAnswerSubmit}
                handleAnswerDelete={this.handleAnswerDelete}
                handleReviewSubmit={this.handleReviewSubmit}
              />
            </Route>
            <Route path="/search">
              <NavBar />
              <QuestionSearch 
                allSkills={this.state.allSkills}
                questionSearchUsers={this.state.questionSearchUsers}
                handleQuestionSearchDropdown={this.handleQuestionSearchDropdown}
                handleQuestionSearchbar={this.handleQuestionSearchbar}
                handlePromptedUser={this.handlePromptedUser}
              />
            </Route>
            <Route path="/form">
              <NavBar />
              <QuestionForm 
                currentUser={this.state.user}
                promptedUser={this.state.promptedUser}
                promptedUserSkill={this.state.promptedUserSkill}
                handleQuestionSubmit={this.handleQuestionSubmit}
              />
            </Route>
          </Switch>
        :
          <Login handleLogin={this.handleLogin}/> }
      </div>
    )

  }
}

export default withRouter(App);